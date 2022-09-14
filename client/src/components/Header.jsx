import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import headerStyles from '../styles/Header.module.css';
import { UserContext } from '../userContext';

export const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    fetch('/login', {
      method: 'DELETE',
    }).then(() => setUser(null));
  };
  return (
    <header className={headerStyles.header}>
      <div>Flashcard App (name pending)</div>
      {/* <div>{user ? user.username : 'Log in!'}</div> */}
      {user ? (
        <div>
          <div>{user.username}</div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <Link to={'/signin'}>Log in</Link>
      )}
    </header>
  );
};
