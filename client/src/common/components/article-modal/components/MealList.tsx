import { nanoid } from 'nanoid';
import { IMeal } from 'types/interfaces';
import * as SC from './MealListStyle';

interface MealListProps {
  mealList: Array<IMeal[]>;
}

const reduceMeal = (mealList: Array<IMeal[]>) =>
  mealList.map((meal) => meal.map((food) => [food.foodName, food.quantity]));

const MealList = ({ mealList }: MealListProps) => {
  const mealData = reduceMeal(mealList);

  return (
    <SC.Wrapper>
      {mealData.map((meal, index) => (
        <SC.MealContainer key={nanoid()}>
          <SC.MealName>식사{index + 1}</SC.MealName>
          <div>
            {meal.map((data) => (
              <SC.FoodContainer key={nanoid()}>
                <SC.FoodName>{data[0]}</SC.FoodName>
                <SC.FoodQuantity>{data[1]}</SC.FoodQuantity>
              </SC.FoodContainer>
            ))}
          </div>
        </SC.MealContainer>
      ))}
    </SC.Wrapper>
  );
};
export default MealList;
