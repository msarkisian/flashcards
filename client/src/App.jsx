import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Splash } from './components/Splash';
import { Study } from './components/Study';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route
        path="/study"
        element={<Study deckId={'6320bdaaf7ec7c68ea31c380'} />}
      />
    </Routes>
  );
}

export default App;
