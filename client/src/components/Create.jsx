import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { DraftCard } from './DraftCard';

export const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [draft, setDraft] = useState([]);
  const [sumbitError, setSubmitError] = useState(false);
  const [user] = useContext(UserContext);
  const cardKey = useRef(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('deckDraft'))
      setDraft(JSON.parse(window.localStorage.getItem('deckDraft')));
    if (window.localStorage.getItem('titleDraft'))
      setTitle(window.localStorage.getItem('titleDraft'));
    if (window.localStorage.getItem('descDraft'))
      setDesc(window.localStorage.getItem('descDraft'));
  }, []);
  useEffect(() => {
    window.localStorage.setItem('deckDraft', JSON.stringify(draft));
  }, [draft]);
  useEffect(() => {
    window.localStorage.setItem('titleDraft', title);
  }, [title]);
  useEffect(() => {
    window.localStorage.setItem('descDraft', desc);
  }, [desc]);

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
      const body = {
        name: title,
        cards: draft.map((card) => {
          return { front: card.front, back: card.back };
        }),
      };
      if (desc) body.description = desc;
      fetch('/userdecks', {
        method: 'POST',
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
  return (
    <>
      <h1>Deck builder</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} />
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
      {draft.length > 0 && <button onClick={submitDeck}>Create deck</button>}
      {sumbitError && (
        <div>
          Deck requires a title. and all cards must have a front and a back.
        </div>
      )}
    </>
  );
};
