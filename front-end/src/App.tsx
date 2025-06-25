import { BrowserRouter, Route, Routes } from 'react-router';
import Flights from './pages/Flights/Flyghts.tsx';
import Bookmarks from './pages/Bookmarks/Bookmarks.tsx';
import { SideBar } from './components/SideBar/SideBar.tsx';

const App = () => {
  return (
    <>
      <SideBar />
        <BrowserRouter>
          <Routes>
            <Route path="/flights" element={<Flights />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
