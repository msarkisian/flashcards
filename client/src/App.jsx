import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Splash } from './components/Splash';
import { Study } from './components/Study';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/study" element={<Study deckName={'bob'} />} />
    </Routes>
  );
}

export default App;
