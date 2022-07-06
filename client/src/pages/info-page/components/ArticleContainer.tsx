import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContainerSection from './ArticleContainerStyle';
import ExerciseDummyItem from './ExerciseDummyItem';
import MealDummyItem from './MealDummyItem';

const ArticleContainer: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== 'exercise' && type !== 'meal') {
      navigate('/error');
    }
  }, [type]);

  return (
    <ContainerSection>
      {Array(8)
        .fill(0)
        .map(
          () =>
            type === 'exercise' && (
              <ExerciseDummyItem key={`dummy-item-${Math.random()}`} />
            )
        )}
      {Array(8)
        .fill(0)
        .map(
          () =>
            type === 'meal' && (
              <MealDummyItem key={`dummy-item-${Math.random()}`} />
            )
        )}
    </ContainerSection>
  );
};

export default ArticleContainer;
