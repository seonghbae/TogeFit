// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

// Nav
import { Nav } from 'common/components';

// pages
import {
  InfoPage,
  RoutinePage,
  AddRoutinePage,
  DietPage,
  LoginPage,
  MainPage,
  RegisterPage,
} from './pages';

const App = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/routine/add" element={<AddRoutinePage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/info/*" element={<InfoPage />} />
        <Route path="/diet/*" element={<DietPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>error!</div>} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default App;
