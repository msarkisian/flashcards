import React from 'react';
import { useState } from 'react';
import '../styles/style.css';
import cardStyles from '../styles/Card.module.css';
import { Link } from 'react-router-dom';

export const Card = ({ deck }) => {
  const [front, setFront] = useState(true);
  const [cards, setCards] = useState(() => deck.cards);

  const nextCard = () => {
    setCards([...cards.slice(1), cards[0]]);
    setFront(true);
  };
  const removeCard = () => {
    setCards([...cards.slice(1)]);
    setFront(true);
  };
  const shuffleCards = () => {
    const shuffledCards = [...cards]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setCards(shuffledCards);
    setFront(true);
  };
  if (!cards[0])
    return (
      <div>
        <h2>You've finished studying for now!</h2>
        <ul>
          <li>
            <Link to={'/decklist'}>Browse another deck</Link>
          </li>
          <li>
            <Link to={'/'}>Go home</Link>
          </li>
        </ul>
      </div>
    );

  return (
    <>
      <div>{cards.length} cards remaining</div>
      <div className="card">
        {front ? <h4>{cards[0].front}</h4> : <h4>{cards[0].back}</h4>}
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
        <button onClick={removeCard}>Remove</button>
        <button onClick={shuffleCards}>Shuffle</button>
      </div>
      <Link to={'/'}>Go home</Link>
    </>
  );
};
