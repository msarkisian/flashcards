import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

export const PrivateDecks = () => {
  const [user] = useContext(UserContext);
  if (!user)
    return (
      <div>
        Please <Link to={'/signin'}>Log in</Link> to view this page
      </div>
    );
  return <div>hey</div>;
};
