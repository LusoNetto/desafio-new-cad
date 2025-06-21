import { BrowserRouter, Route, Routes } from 'react-router';
import Flights from './pages/Flights/Flyghts.tsx';

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;