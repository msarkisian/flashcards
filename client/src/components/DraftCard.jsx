import React from 'react';

export const DraftCard = ({ card, handleChange, handleDelete }) => {
  return (
    <div>
      <input
        name="front"
        value={card.front}
        onChange={(e) => handleChange(card.id, 'front', e.target.value)}
      />
      <input
        name="back"
        value={card.back}
        onChange={(e) => handleChange(card.id, 'back', e.target.value)}
      />
      <button onClick={() => handleDelete(card.id)}>Remove card</button>
    </div>
  );
};
