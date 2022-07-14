import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Meal from './Meal';
import dietState from '../states/dietState';
import useFood from '../hooks/useFood';
import * as SC from './DietInfoStyle';

const DietInfo = () => {
  const diet = useRecoilValue(dietState);
  const date = new Date(diet.createdAt);
  const { food, getFood } = useFood();

  useEffect(() => {
    getFood();
  }, []);

  return (
    <SC.DietInfoContainer>
      <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>
      <Link to="/diet/add">
        <SC.ButtonWrapper>
          <button type="button">+</button>
        </SC.ButtonWrapper>
      </Link>
      {food?.status === 200 &&
        diet.meals.map((meal, index) => (
          <Meal
            key={`식사${index + 1}`}
            mealName={`식사${index + 1}`}
            mealList={meal.meal_list}
            food={food}
          />
        ))}
    </SC.DietInfoContainer>
  );
};

export default DietInfo;
