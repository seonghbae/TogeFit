import { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Meal from './Meal';
import dietState from '../states/dietState';
import dietUpdateState from '../states/dietUpdateState';
import useFood from '../hooks/useFood';
import * as SC from './DietInfoStyle';

const DietInfo = () => {
  const { food, getFood } = useFood();
  const [dietUpdate, setDietUpdate] = useRecoilState(dietUpdateState);
  const diet = useRecoilValue(dietState);
  const date = new Date(diet.createdAt);
  const navigate = useNavigate();

  useEffect(() => {
    getFood();
  }, []);

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/diet/add');
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = () => {
    if (dietUpdate) {
      setDietUpdate(false);
      return;
    }
    setDietUpdate(true);
  };

  return (
    <SC.DietInfoContainer>
      <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>
      <SC.ButtonWrapper>
        {dietUpdate && (
          <button type="button" onClick={handleAddMeal}>
            +
          </button>
        )}
      </SC.ButtonWrapper>
      {food?.status === 200 &&
        diet.meals.map((meal, index) => (
          <Meal
            key={`식사${index + 1}`}
            mealName={`식사${index + 1}`}
            mealList={meal.meal_list}
            food={food}
          />
        ))}
      {dietUpdate ? (
        <button type="button" onClick={handleUpdate}>
          수정 모드 종료
        </button>
      ) : (
        <button type="button" onClick={handleUpdate}>
          수정 모드
        </button>
      )}
    </SC.DietInfoContainer>
  );
};

export default DietInfo;
