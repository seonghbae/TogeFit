import { Routes, Route, Navigate } from 'react-router-dom';
import Wrapper from './InfoPageStyle';
import Header from './components/Header';
import ArticleContainer from './components/ArticleContainer';

const InfoPage: React.FC = () => (
  <Wrapper>
    <Header />
    <Routes>
      <Route path="/*" element={<Navigate replace to="exercise" />} />
      <Route path="exercise" element={<ArticleContainer />} />
      <Route path="meal" element={<ArticleContainer />} />
    </Routes>
  </Wrapper>
);

export default InfoPage;
