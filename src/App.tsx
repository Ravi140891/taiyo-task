// This file is responsible for rendering different pages based on the current route.

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contacts from './pages/Contacts';
import CovidChart from './pages/CovidChart';
import CovidMap from './pages/CovidMap';
import Sidebar from './component/Sidebar';

function App(): JSX.Element {
  // Render the Sidebar component and Routes for each page
  return (
    <div className="container bg-amber-50 h-screen mx-auto max-w-none">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/charts" element={<CovidChart />} />
        <Route path="/maps" element={<CovidMap />} />
      </Routes>
    </div>
  );
}

export default App;
