import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

export const Home = () => {
  const [user] = useContext(UserContext);
  return (
    <div>
      <h2>
        {new Date().getHours() > 17 ? (
          <>Good evening, </>
        ) : new Date().getHours() > 11 ? (
          <>Good afternoon, </>
        ) : (
          <>Good morning, </>
        )}
        {<>{user.username}!</>}
      </h2>
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
