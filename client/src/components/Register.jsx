import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import loginStyles from '../styles/Login.module.css';

export const Register = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    });
    fetch('/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
        navigate('/');
      });
  };
  return (
    <div className={loginStyles.loginContainer}>
      <form className={loginStyles.loginForm} onSubmit={(e) => handleSumbit(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <input id={loginStyles.loginButton} type="submit" value="Register" />
      </form>
      <Link to={'/'}>Go home</Link>
    </div>
  );
};
