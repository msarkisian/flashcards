import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { DraftCard } from './DraftCard';

export const Create = () => {
  const [draft, setDraft] = useState([]);
  const [user] = useContext(UserContext);
  const cardKey = useRef(0);
  useEffect(() => {
    if (window.localStorage.getItem('deckDraft'))
      setDraft(window.localStorage.getItem('deckDraft'));
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

  if (!user)
    return (
      <div>
        Please <Link to={'/signin'}>Log in</Link> to build a flashcard deck.
      </div>
    );
  return (
    <>
      <h1>Deck builder</h1>
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
    </>
  );
};
