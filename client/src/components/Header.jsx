import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headerStyles from '../styles/Header.module.css';
import { UserContext } from '../userContext';

export const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch('/login', {
      method: 'DELETE',
    }).then(() => {
      setUser(null);
      navigate('/');
    });
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
        <div>
          <Link to={'/signin'}>Log in</Link>
          <Link to={'/signup'}>Register</Link>
        </div>
      )}
    </header>
  );
};
