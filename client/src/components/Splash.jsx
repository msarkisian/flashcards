import React from 'react';
import { Link } from 'react-router-dom';

export const Splash = ({}) => {
  return (
    <div>
      <div>Welcome</div>
      <Link to={'/decklist'}>List of Public Flashcard Decks</Link>
    </div>
  );
};
