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
      localStorage.clear();
      navigate('/');
    });
  };
  return (
    <header className={headerStyles.header}>
      <div>
        <Link to={'/'}>Flashcards</Link>
      </div>
      {/* <div>{user ? user.username : 'Log in!'}</div> */}
      {user ? (
        <div>
          <span className={headerStyles.username}>{user.username}</span>
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
