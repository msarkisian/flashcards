import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Card } from './Card';

export const Study = ({ personal }) => {
  const { deckId } = useParams();
  const [deck, loadingDeck] = useFetch(
    personal ? `/userdecks/${deckId}` : `/decks/${deckId}`
  );

  if (loadingDeck) {
    return <h4>Loading, please wait</h4>;
  }
  return (
    <div>
      <h1>{deck.name}</h1>
      {deck.description && <h3>{deck.description}</h3>}
      <div>
        <Card deck={deck} personal={personal} />
      </div>
    </div>
  );
};
