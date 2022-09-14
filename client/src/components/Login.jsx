import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

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
    <div>
      <form onSubmit={(e) => handleSumbit(e)}>
        <label htmlFor="username">Username:</label>
        <input name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Log in" />
      </form>
      {loginError && <div>Invalid username or password</div>}
      <Link to={'/'}>Go home</Link>
    </div>
  );
};
