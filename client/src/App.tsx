// module

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { Routine } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/routine" element={<Routine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
