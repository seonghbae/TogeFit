import { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Meal from './Meal';
import dietState from '../states/dietState';
import useFood from '../hooks/useFood';
import * as SC from './DietInfoStyle';

const DietInfo = () => {
  const { food, getFood } = useFood();
  const diet = useRecoilValue(dietState);
  const date = new Date(diet.createdAt);
  const navigate = useNavigate();

  useEffect(() => {
    getFood();
  }, []);

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/diet/add');
  };

  return (
    <SC.DietInfoContainer>
      <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>
      <SC.ButtonWrapper>
        <button type="button" onClick={handleAddMeal}>
          +
        </button>
      </SC.ButtonWrapper>
      {food?.status === 200 &&
        diet.meals.map((meal, index) => (
          <Meal
            key={`식사${index + 1}`}
            mealName={`식사${index + 1}`}
            mealList={meal}
            food={food}
          />
        ))}
    </SC.DietInfoContainer>
  );
};

export default DietInfo;
