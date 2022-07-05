// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { InfoPage, RoutinePage } from './pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/routine" element={<RoutinePage />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
