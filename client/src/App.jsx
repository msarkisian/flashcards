import { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { PublicDecks } from './components/PublicDecks';
import { Splash } from './components/Splash';
import { Study } from './components/Study';
import { UserContext } from './userContext';

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/decklist" element={<PublicDecks />} />
          <Route path="/study/:deckId" element={<Study />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
