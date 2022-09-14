import { useEffect } from 'react';
import { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { PrivateDecks } from './components/PrivateDecks';
import { PublicDecks } from './components/PublicDecks';
import { Register } from './components/Register';
import { Splash } from './components/Splash';
import { Study } from './components/Study';
import { UserContext } from './userContext';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/login')
      .then((res) => res.json())
      .then((json) => {
        if (json.username)
          setUser({
            username: json.username,
            id: json.userId,
          });
      });
  }, []);
  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Routes>
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Splash />} />
          )}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/decklist" element={<PublicDecks />} />
          <Route path="/privatedecks" element={<PrivateDecks />} />
          <Route path="/study/:deckId" element={<Study />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
