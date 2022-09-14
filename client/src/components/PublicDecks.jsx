import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export const PublicDecks = () => {
  const [decks, loadingDecks] = useFetch('/decks');
  if (loadingDecks) return <h2>Loading list of decks...</h2>;
  return (
    <div>
      <h1>Public flashcard decks:</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`/study/${deck._id}`}>{deck.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
