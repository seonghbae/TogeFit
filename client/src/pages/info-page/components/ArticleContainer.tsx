import getPath from 'common/utils/getPath';
import ContainerSection from './ArticleContainerStyle';
import ExerciseDummyItem from './ExerciseDummyItem';
import MealDummyItem from './MealDummyItem';

const ArticleContainer = () => {
  const path = getPath();

  return (
    <ContainerSection>
      {Array(8)
        .fill(0)
        .map(
          () =>
            path === 'exercise' && (
              <ExerciseDummyItem key={`dummy-item-${Math.random()}`} />
            )
        )}
      {Array(8)
        .fill(0)
        .map(
          () =>
            path === 'meal' && (
              <MealDummyItem key={`dummy-item-${Math.random()}`} />
            )
        )}
    </ContainerSection>
  );
};

export default ArticleContainer;
