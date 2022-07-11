/* eslint-disable no-console */
import getPath from 'common/utils/getPath';
import CustomCard from 'common/components/custom-card/CustomCard';
import { useEffect } from 'react';
import { customAxios } from 'common/api';
import * as SC from './ArticleContainerStyle';
// import ExerciseDummyItem from './ExerciseDummyItem';
import MealDummyItem from './MealDummyItem';

const ArticleContainer = () => {
  const path = getPath();

  useEffect(() => {
    customAxios.get(`/api/post/user/test123`).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <SC.ContainerSection>
      {Array(8)
        .fill(0)
        .map(
          () =>
            path === 'exercise' && (
              <CustomCard
                key={`dummy-item-${Math.random()}`}
                imgUrl="https://team-16-s3.s3.ap-northeast-2.amazonaws.com/u99cT3fpd.jpeg"
                content="날씨가 좋다~~!!!"
                tagList={['조깅', '야외']}
              />
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
