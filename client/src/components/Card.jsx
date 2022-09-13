import React from 'react';
import { useState } from 'react';
import '../styles/style.css';
import cardStyles from '../styles/Card.module.css';
import { Link } from 'react-router-dom';

export const Card = ({ deck }) => {
  // const [cardIndex, setCardIndex] = useState(0);
  const [front, setFront] = useState(true);
  const [cards, setCards] = useState(() => deck.cards);

  // const nextCard = () => {
  //   if (cardIndex !== deck.cards.length - 1) setCardIndex(cardIndex + 1);
  //   else setCardIndex(0);
  //   setFront(true);
  // };
  // const removeCard = () => {
  //   deck.cards.splice(cardIndex, 1);
  //   setCardIndex(cardIndex);
  // };
  const nextCard = () => {
    setCards([...cards.slice(1), cards[0]]);
  };
  const removeCard = () => {
    setCards([...cards.slice(1)]);
  };
  const shuffleCards = () => {
    const shuffledCards = [...cards]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setCards(shuffledCards);
  };
  if (!cards[0])
    return (
      <div>
        <h2>You've finished studying for now!</h2>
        <Link to={'/decklist'}>Browse another deck</Link>
        <Link to={'/'}>Go home</Link>
      </div>
    );

  return (
    <>
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
