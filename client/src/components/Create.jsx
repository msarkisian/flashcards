import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { DraftCard } from './DraftCard';

export const Create = ({ edit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [draft, setDraft] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [sumbitError, setSubmitError] = useState(false);
  const [user] = useContext(UserContext);
  const cardKey = useRef(0);
  const isInitialLoad = useRef(true);
  const navigate = useNavigate();
  const { deckId } = useParams();
  useEffect(() => {
    if (!edit) {
      if (window.localStorage.getItem('deckDraft')) {
        console.log(window.localStorage.getItem('deckDraft'));
        setDraft(JSON.parse(window.localStorage.getItem('deckDraft')));
      }
      if (window.localStorage.getItem('titleDraft'))
        setTitle(window.localStorage.getItem('titleDraft'));
      if (window.localStorage.getItem('descDraft'))
        setDesc(window.localStorage.getItem('descDraft'));
    }
  }, []);
  useEffect(() => {
    if (isInitialLoad.current) isInitialLoad.current = false;
    else if (!edit)
      window.localStorage.setItem('deckDraft', JSON.stringify(draft));
  }, [draft]);
  useEffect(() => {
    if (!edit) window.localStorage.setItem('titleDraft', title);
  }, [title]);
  useEffect(() => {
    if (!edit) window.localStorage.setItem('descDraft', desc);
  }, [desc]);
  useEffect(() => {
    if (edit) {
      setFetching(true);
      fetch(`/userdecks/${deckId}`)
        .then((res) => res.json())
        .then((json) => {
          setTitle(json.name);
          setDraft(
            json.cards.map((card) => {
              card.id = cardKey.current;
              cardKey.current++;
              return card;
            })
          );
          if (json.description) setDesc(json.description);
          setFetching(false);
        });
    }
  }, []);

  const handleChange = (id, side, content) => {
    const idx = draft.findIndex((card) => card.id === id);
    setDraft([
      ...draft.slice(0, idx),
      { ...draft[idx], [side]: content },
      ...draft.slice(idx + 1),
    ]);
  };

  const handleDelete = (id) => {
    const idx = draft.findIndex((card) => card.id === id);
    setDraft([...draft.slice(0, idx), ...draft.slice(idx + 1)]);
  };

  const submitDeck = () => {
    if (!title || draft.some((card) => card.front === '' || card.back === '')) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 4000);
    } else {
      setFetching(true);
      const body = {
        name: title,
        cards: draft.map((card) => {
          return { front: card.front, back: card.back };
        }),
      };
      if (desc) body.description = desc;
      fetch('/userdecks/' + (edit ? deckId : ''), {
        method: edit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.status === 200) {
          window.localStorage.clear();
          navigate('/privatedecks');
        }
      });
    }
  };

  if (!user)
    return (
      <div>
        Please <Link to={'/signin'}>Log in</Link> to build a flashcard deck.
      </div>
    );
  if (fetching) return <h2>Loading, please wait</h2>;
  return (
    <>
      <h1>Deck builder</h1>
      <input
        value={title}
        placeholder={'Deck Title'}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={desc}
        placeholder={'Description (optional)'}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div>
        {draft.length} card{draft.length !== 1 && <>s</>} in deck
        <button
          onClick={() => {
            setDraft([...draft, { id: cardKey.current, front: '', back: '' }]);
            cardKey.current++;
          }}
        >
          Add card
        </button>
      </div>
      {draft.map((card) => {
        return (
          <DraftCard
            card={card}
            handleChange={handleChange}
            handleDelete={handleDelete}
            key={card.id}
          />
        );
      })}
      {draft.length > 0 && (
        <button onClick={submitDeck}>
          {edit ? <>Edit deck</> : <>Create Deck</>}
        </button>
      )}
      {sumbitError && (
        <div>
          Deck requires a title. and all cards must have a front and a back.
        </div>
      )}
      <div>
        <Link to={'/privatedecks'}>Go back</Link>
      </div>
    </>
  );
};
