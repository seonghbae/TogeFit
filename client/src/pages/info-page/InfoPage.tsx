import { Routes, Route } from 'react-router-dom';
import Wrapper from './InfoPageStyle';
import Header from './components/Header';
import ArticleContainer from './components/ArticleContainer';

const InfoPage: React.FC = () => (
  <Wrapper>
    <Header />
    <Routes>
      <Route path="/*" element={<div>운동, 식단을 선택해주세요.</div>} />
      <Route path="exercise" element={<ArticleContainer />} />
      <Route path="meal" element={<ArticleContainer />} />
    </Routes>
  </Wrapper>
);

export default InfoPage;
