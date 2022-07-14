import { Calorie } from 'common/components';
import { ICalorieProps, IFoodList, IMeal } from 'types/interfaces';
import * as SC from './MealStyle';

interface IMealProps {
  mealName: string;
  mealList: IMeal[];
  food: IFoodList;
}

const Meal = ({ mealName, mealList, food }: IMealProps) => {
  const init: ICalorieProps = {
    names: [],
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  };

  const calorie = mealList.reduce((prevMeal, nextMeal) => {
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

  const handleUpdate = () => {
    alert('Update');
  };

  const handleDelete = () => {
    alert('Delete');
  };

  return (
    <SC.MealContainer>
      <span>{mealName}</span>
      <SC.ContentContainer>
        <SC.MealList>
          {mealList.map((meal) => (
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
