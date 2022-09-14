import React from 'react';
import { Link } from 'react-router-dom';

export const Splash = ({}) => {
  return (
    <div>
      <Link to={'/decklist'}>List of Public Flashcard Decks</Link>
      <h4>
        <Link to={'/signup'}>Create an account</Link> to add your own
        Flashcards!
      </h4>
    </div>
  );
};
