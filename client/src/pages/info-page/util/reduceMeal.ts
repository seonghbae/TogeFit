import { IDiet, ICalorieProps, IFoodList } from 'types/interfaces';

const init: ICalorieProps = {
  names: [],
  carbohydrate: 0,
  protein: 0,
  fat: 0,
  calories: 0,
};

const reduceMeal = (dietList?: IDiet[], food?: IFoodList) =>
  dietList?.map((dietItem) => {
    const reducedMealList = dietItem.meals.reduce(
      (prevMeal, nextMeal, index) => {
        const calorie = nextMeal.meal_list.reduce((prevFood, nextFood) => {
          const foodInfo = food?.data.find(
            (item) => item.name === nextFood.foodName
          );
          if (foodInfo === undefined) return prevFood;
          const ratio = nextFood.quantity / foodInfo.quantity;
          return {
            ...prevFood,
            carbohydrate: prevFood.carbohydrate + foodInfo.carbohydrate * ratio,
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
      },
      init
    );
    return { reducedMealList, date: dietItem.createdAt };
  });

export default reduceMeal;
