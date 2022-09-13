import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const handleSumbit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    });
    console.log(body);
    fetch('/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
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
      <Link to={'/'}>Go home</Link>
    </div>
  );
};
