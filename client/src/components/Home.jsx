import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

export const Home = () => {
  const [user] = useContext(UserContext);
  return (
    <div>
      <div>Logged in as {user.username}</div>
      <ul>
        <li>
          <Link to={'/privatedecks'}>My Flashcard Decks</Link>
        </li>
        <li>
          <Link to={'/decklist'}>List of Public Flashcard Decks</Link>
        </li>
      </ul>
    </div>
  );
};
