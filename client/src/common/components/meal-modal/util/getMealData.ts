import { IFoodList, IMeal, IFood } from 'types/interfaces';

const initValue = {
  칼로리: 0,
  탄수화물: 0,
  단백질: 0,
  지방: 0,
};

const getMealData = (
  foodList: IFoodList,
  mealList: IMeal[]
): Array<{ name: string; value: number }> => {
  const reducedData = mealList.reduce((acc, meal) => {
    const foodData: IFood | undefined = foodList.data.find(
      (food) => food.name === meal.foodName
    );

    if (!foodData) {
      return acc;
    }

    const quantity = meal.quantity / foodData.quantity;

    return {
      칼로리: acc.칼로리 + foodData.calories * quantity,
      탄수화물: acc.탄수화물 + foodData.carbohydrate * quantity,
      단백질: acc.단백질 + foodData.protein * quantity,
      지방: acc.지방 + foodData.fat * quantity,
    };
  }, initValue);

  const nutrient = Object.entries(reducedData);

  return nutrient.map((element) => ({ name: element[0], value: element[1] }));
};
export default getMealData;
