// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { Routine, InfoPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/routine" element={<Routine />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
