import { Routes, Route, Navigate } from 'react-router-dom';
import * as SC from './InfoPageStyle';
import Header from './components/Header';
import PostContainer from './components/PostContainer';
import MealContainer from './components/MealContainer';

const InfoPage = () => (
  <SC.Wrapper>
    <Header />
    <Routes>
      <Route path="/*" element={<Navigate replace to="exercise/undifined" />} />
      <Route path="exercise/:userId" element={<PostContainer />} />
      <Route path="meal/:userId" element={<MealContainer />} />
    </Routes>
  </SC.Wrapper>
);

export default InfoPage;
