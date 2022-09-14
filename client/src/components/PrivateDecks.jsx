import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';

export const PrivateDecks = () => {
  const [user] = useContext(UserContext);
  let [decks, loadingDecks, setDecks] = useFetch('/userdecks');
  const navigate = useNavigate();
  const handleDelete = (id) => {
    fetch(`/userdecks/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 204) {
        setDecks([...decks.filter((deck) => deck._id !== id)]);
      }
    });
  };
  if (!user)
    return (
      <div>
        Please <Link to={'/signin'}>Log in</Link> to view this page
      </div>
    );
  if (loadingDecks) return <h2>Loading list of decks...</h2>;
  return (
    <div>
      {decks[0] ? (
        <h1>Your flashcard decks:</h1>
      ) : (
        <h2>You haven't made any flashcard decks yet!</h2>
      )}
      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`/study/private/${deck._id}`}>{deck.name}</Link>
            <button onClick={() => handleDelete(deck._id)}>Delete deck</button>
          </li>
        ))}
      </ul>
      <Link to={'/create'}>Create new deck</Link>
    </div>
  );
};
