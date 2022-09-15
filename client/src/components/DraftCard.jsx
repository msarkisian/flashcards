import React from 'react';
import createStyles from '../styles/Create.module.css';

export const DraftCard = ({ card, handleChange, handleDelete }) => {
  return (
    <div className={createStyles.cardInputContainer}>
      <input
        name="front"
        placeholder="front"
        className={createStyles.cardInput}
        value={card.front}
        onChange={(e) => handleChange(card.id, 'front', e.target.value)}
      />
      <input
        name="back"
        placeholder="back"
        className={createStyles.cardInput}
        value={card.back}
        onChange={(e) => handleChange(card.id, 'back', e.target.value)}
      />
      <button
        className={createStyles.removeCardButton}
        onClick={() => handleDelete(card.id)}
      >
        Remove card
      </button>
    </div>
  );
};
