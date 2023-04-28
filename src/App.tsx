import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contacts from './pages/Contacts';

function App(): JSX.Element {
  return (
    <div className="container bg-amber-50 h-screen mx-auto max-w-none">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;
