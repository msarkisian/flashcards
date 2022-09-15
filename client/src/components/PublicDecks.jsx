import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

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
            {
              <>
                {' '}
                ({deck.cardCount} card{deck.cardCount !== 1 && <>s</>})
              </>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
