// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { InfoPage, RoutinePage, DietPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/routine" element={<RoutinePage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/diet" element={<DietPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
