/* eslint-disable no-underscore-dangle */
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Calorie } from 'common/components';
import { ICalorieProps, IFoodList, IMeal, IDiet } from 'types/interfaces';
import dietState from '../states/dietState';
import dietIdState from '../states/dietIdState';
import useDietDelete from '../hooks/useDietDelete';
import * as SC from './ChartListStyle';

export const ChartList = ({
  food,
  dietItem,
}: {
  food: IFoodList;
  dietItem: IDiet;
}) => {
  const [diet, setDiet] = useRecoilState(dietState);
  const [dietId, setDietId] = useRecoilState(dietIdState);
  const { deleteDiet } = useDietDelete();
  const navigate = useNavigate();

  const init: ICalorieProps = {
    names: [],
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  };

  const getCalorie = (mealList: IMeal[]) =>
    mealList.reduce((prevFood, nextFood) => {
      const foodInfo = food.data.find(
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

  const calorieChart = dietItem.meals.reduce((prevMeal, nextMeal, index) => {
    const calorie = getCalorie(nextMeal.meal_list);
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

  const handleRead: MouseEventHandler<HTMLButtonElement> = () => {
    setDiet(dietItem);
    setDietId(dietItem._id);
    navigate('/diet/info');
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteDiet({ mealArticleId: dietItem._id });
    navigate('/diet');
  };

  const date = new Date(dietItem.createdAt);
  const dietDate = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <SC.ChartContainer>
      <div>{dietDate}</div>
      <Calorie
        foods={calorieChart.names}
        carbohydrate={Number(calorieChart.carbohydrate.toFixed(3))}
        protein={Number(calorieChart.protein.toFixed(3))}
        fat={Number(calorieChart.fat.toFixed(3))}
      />
      <SC.ButtonContainer>
        <button type="button" onClick={handleRead}>
          상세
        </button>
        <button type="button" onClick={handleDelete}>
          삭제
        </button>
      </SC.ButtonContainer>
    </SC.ChartContainer>
  );
};
