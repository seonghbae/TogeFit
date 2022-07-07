import { Routes, Route } from 'react-router-dom';
import Wrapper from './InfoPageStyle';
import Header from './components/Header';
import ArticleContainer from './components/ArticleContainer';
import DefaultArticle from './components/DefaultArticle';

const InfoPage: React.FC = () => (
  <Wrapper>
    <Header />
    <Routes>
      <Route path="/*" element={<DefaultArticle />} />
      <Route path="exercise" element={<ArticleContainer />} />
      <Route path="meal" element={<ArticleContainer />} />
    </Routes>
  </Wrapper>
);

export default InfoPage;
