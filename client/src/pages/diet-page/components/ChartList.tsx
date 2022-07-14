import { Calorie } from 'common/components';
import { ICalorieProps, IFoodList, IUserDietList } from 'types/interfaces';
import * as SC from './ChartListStyle';

export const ChartList = ({
  food,
  userDietList,
}: {
  food: IFoodList;
  userDietList: IUserDietList;
}) => {
  const init: ICalorieProps = {
    names: [],
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  };
  return (
    <SC.ChartListContainer>
      {userDietList.data.map((diet) => {
        const calorieChart = diet.meals.reduce((prevMeal, nextMeal, index) => {
          const calorie = nextMeal.meal_list.reduce((prevFood, nextFood) => {
            const foodInfo = food.data.find(
              (item) => item.name === nextFood.foodName
            );
            if (foodInfo === undefined) return prevFood;
            const ratio = nextFood.quantity / foodInfo.quantity;
            return {
              ...prevFood,
              carbohydrate:
                prevFood.carbohydrate + foodInfo.carbohydrate * ratio,
              protein: prevFood.protein + foodInfo.protein * ratio,
              fat: prevFood.fat + foodInfo.fat * ratio,
              calories: prevFood.calories + foodInfo.calories * ratio,
            };
          }, init);
          return {
            ...prevMeal,
            names: [
              ...prevMeal.names,
              { name: `식사${index + 1}`, value: calorie.calories },
            ],
            carbohydrate: prevMeal.carbohydrate + calorie.carbohydrate,
            protein: prevMeal.protein + calorie.protein,
            fat: prevMeal.fat + calorie.fat,
          };
        }, init);
        const date = new Date(diet.createdAt);
        return (
          <>
            <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>
            <Calorie
              key={diet.id}
              foods={calorieChart.names}
              carbohydrate={Number(calorieChart.carbohydrate.toFixed(1))}
              protein={Number(calorieChart.protein.toFixed(1))}
              fat={Number(calorieChart.fat.toFixed(1))}
            />
          </>
        );
      })}
    </SC.ChartListContainer>
  );
};
