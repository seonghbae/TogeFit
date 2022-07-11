import { Routes, Route, Navigate } from 'react-router-dom';
import * as SC from './InfoPageStyle';
import Header from './components/Header';
import ArticleContainer from './components/ArticleContainer';

const InfoPage = () => (
  <SC.Wrapper>
    <Header />
    <Routes>
      <Route path="/*" element={<Navigate replace to="exercise" />} />
      <Route path="exercise" element={<ArticleContainer />} />
      <Route path="meal" element={<ArticleContainer />} />
    </Routes>
  </SC.Wrapper>
);

export default InfoPage;
