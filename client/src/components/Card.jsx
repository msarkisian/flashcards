import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cardStyles from '../styles/Card.module.css';
import '../styles/style.css';

export const Card = ({ deck, personal }) => {
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
          {personal && (
            <li>
              <Link to={'/privatedecks'}>Back to my decks</Link>
            </li>
          )}
          <li>
            <Link to={'/decklist'}>
              {personal ? <>Browse public decks</> : <>Browse another deck</>}
            </Link>
          </li>
          <li>
            <Link to={'/'}>Go home</Link>
          </li>
        </ul>
      </div>
    );

  return (
    <>
      <div>
        {cards.length} card{cards.length !== 1 && <>s</>} remaining
      </div>
      <div className={cardStyles.card}>
        {front ? <h4>{cards[0].front}</h4> : <h4>{cards[0].back}</h4>}
        <div>
          <button className={cardStyles.flip} onClick={() => setFront(!front)}>
            Flip
          </button>
        </div>
      </div>
      <div className={cardStyles.lowerButtons}>
        <div>
          <button onClick={removeCard}>Remove card</button>
          <button onClick={nextCard}>Next card</button>
        </div>
        <div>
          <button onClick={shuffleCards}>Shuffle deck</button>
        </div>
      </div>
      <div>
        <Link to={'/'}>Go home</Link>
      </div>
    </>
  );
};
