import React, { useContext } from 'react';
import headerStyles from '../styles/Header.module.css';
import { UserContext } from '../userContext';

export const Header = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <header className={headerStyles.header}>
      {user ? user.username : 'Log in!'}
    </header>
  );
};
