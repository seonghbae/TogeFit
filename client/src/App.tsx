// module

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { RoutinePage } from './pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/routine" element={<RoutinePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
