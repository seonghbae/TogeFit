// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

// Nav
import { Nav } from 'common/components';

// pages
import { InfoPage, RoutinePage, AddRoutinePage, DietPage } from './pages';

const App = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Nav />
      <Routes>
        <Route path="/routine/add" element={<AddRoutinePage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/info/*" element={<InfoPage />} />
        <Route path="/diet" element={<DietPage />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default App;
