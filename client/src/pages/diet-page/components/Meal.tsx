import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calorie } from 'common/components';
import { ICalorieProps, IFoodList, IMealList } from 'types/interfaces';
import useMealDelete from '../hooks/useMealDelete';
import * as SC from './MealStyle';

interface IMealProps {
  mealName: string;
  mealList: IMealList;
  food: IFoodList;
}

const Meal = ({ mealName, mealList, food }: IMealProps) => {
  const { deleteMeal } = useMealDelete();
  const navigate = useNavigate();
  const init: ICalorieProps = {
    names: [],
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  };

  const calorie = mealList.meal_list.reduce((prevMeal, nextMeal) => {
    const foodItem = food.data.find((item) => item.name === nextMeal.foodName);
    if (foodItem === undefined) return prevMeal;
    const ratio = nextMeal.quantity / foodItem.quantity;
    return {
      ...prevMeal,
      names: [
        ...prevMeal.names,
        { name: foodItem.name, value: foodItem.calories * ratio },
      ],
      carbohydrate: prevMeal.carbohydrate + foodItem.carbohydrate * ratio,
      protein: prevMeal.protein + foodItem.protein * ratio,
      fat: prevMeal.fat + foodItem.fat * ratio,
    };
  }, init);

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = () => {
    alert('Update');
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    // eslint-disable-next-line no-underscore-dangle
    deleteMeal({ mealListId: mealList._id });
    navigate('/diet');
  };

  return (
    <SC.MealContainer>
      <span>{mealName}</span>
      <SC.ContentContainer>
        <SC.MealList>
          {mealList.meal_list.map((meal) => (
            <li key={meal.foodName}>{`${meal.foodName} ${meal.quantity}g`}</li>
          ))}
        </SC.MealList>
        <Calorie
          foods={calorie.names}
          carbohydrate={Number(calorie.carbohydrate.toFixed(3))}
          protein={Number(calorie.protein.toFixed(3))}
          fat={Number(calorie.fat.toFixed(3))}
        />
      </SC.ContentContainer>
      <SC.ButtonContainer>
        <button type="button" onClick={handleUpdate}>
          수정
        </button>
        <button type="button" onClick={handleDelete}>
          삭제
        </button>
      </SC.ButtonContainer>
    </SC.MealContainer>
  );
};

export default Meal;
