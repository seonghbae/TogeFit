import ContainerSection from './ArticleContainerStyle';
import DummyItem from './DummyItem';

const ArticleContainer: React.FC = () => (
  <ContainerSection>
    {Array(8)
      .fill(0)
      .map(() => (
        <DummyItem key={`dummy-item-${Math.random()}`} />
      ))}
  </ContainerSection>
);

export default ArticleContainer;
