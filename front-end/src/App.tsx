import { BrowserRouter, Route, Routes } from 'react-router';
import Flights from './pages/Flights/Flyghts.tsx';
import Bookmarks from './pages/Bookmarks/Bookmarks.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/flights" element={<Flights />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
