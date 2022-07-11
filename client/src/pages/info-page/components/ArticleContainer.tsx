import getPath from 'common/utils/getPath';
import * as SC from './ArticleContainerStyle';
import ExerciseDummyItem from './ExerciseDummyItem';
import MealDummyItem from './MealDummyItem';

const ArticleContainer = () => {
  const path = getPath();

  return (
    <SC.ContainerSection>
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
    </SC.ContainerSection>
  );
};

export default ArticleContainer;
