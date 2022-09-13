import React from 'react';
import { useState } from 'react';
import '../styles/style.css';
import cardStyles from '../styles/Card.module.css';

export const Card = ({ deck }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [front, setFront] = useState(true);

  const nextCard = () => {
    if (cardIndex !== deck.cards.length - 1) setCardIndex(cardIndex + 1);
    else setCardIndex(0);
    setFront(true);
  };

  return (
    <>
      <div className="card">
        {front ? (
          <h4>{deck.cards[cardIndex].front}</h4>
        ) : (
          <h4>{deck.cards[cardIndex].back}</h4>
        )}
        <div>
          <button
            className={cardStyles.button}
            onClick={() => setFront(!front)}
          >
            Flip
          </button>
        </div>
      </div>
      <div>
        <button onClick={nextCard}>Next</button>
      </div>
    </>
  );
};
