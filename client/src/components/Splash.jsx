import React from 'react';
import { Link } from 'react-router-dom';

export const Splash = ({}) => {
  return (
    <div>
      <h4>
        <Link to={'/signup'}>Create an account</Link> or{' '}
        <Link to={'/signin'}>Log in</Link> to add your own Flashcards!
      </h4>
      <div>
        You can also <Link to={'/decklist'}>browse public flashcard decks</Link>
      </div>
    </div>
  );
};
