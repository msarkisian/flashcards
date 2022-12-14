import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Create } from './components/Create';
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
          <Route
            path="/study/private/:deckId"
            element={<Study personal={true} />}
          />
          <Route path="/study/:deckId" element={<Study personal={false} />} />
          <Route path="/create" element={<Create edit={false} />} />
          <Route path="/edit/:deckId" element={<Create edit={true} />} />
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
