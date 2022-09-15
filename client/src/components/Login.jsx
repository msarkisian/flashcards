import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import loginStyles from '../styles/Login.module.css';

export const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const handleSumbit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    });
    fetch('/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 2000);
        } else {
          setUser(json);
          navigate('/');
        }
      });
  };
  return (
    <div className={loginStyles.loginContainer}>
      <form className={loginStyles.loginForm} onSubmit={(e) => handleSumbit(e)}>
        <div>
          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input name="username" id="username" />
        </div>
        <div>
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input type="password" name="password" id="password" />
        </div>
        <input id={loginStyles.loginButton} type="submit" value="Log in" />
      </form>
      {loginError && <div>Invalid username or password</div>}
      <Link to={'/'}>Go home</Link>
    </div>
  );
};
