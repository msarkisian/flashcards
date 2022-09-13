import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Login } from './components/Login';
import { PublicDecks } from './components/PublicDecks';
import { Splash } from './components/Splash';
import { Study } from './components/Study';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/decklist" element={<PublicDecks />} />
      <Route path="/study/:deckId" element={<Study />} />
    </Routes>
  );
}

export default App;
