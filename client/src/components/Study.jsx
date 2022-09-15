import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Card } from './Card';
import cardStyles from '../styles/Card.module.css';

export const Study = ({ personal }) => {
  const { deckId } = useParams();
  const [deck, loadingDeck] = useFetch(
    personal ? `/userdecks/${deckId}` : `/decks/${deckId}`
  );

  if (loadingDeck) {
    return <h4>Loading, please wait</h4>;
  }
  return (
    <div className={cardStyles.cardContainer}>
      <h1>{deck.name}</h1>
      {deck.description && <h3>{deck.description}</h3>}
      <Card deck={deck} personal={personal} />
    </div>
  );
};
