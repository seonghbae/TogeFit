import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calorie } from 'common/components';
import { ICalorieProps, IFoodList, IUserDietList } from 'types/interfaces';
import useFood from '../hooks/useFood';
import useDietList from '../hooks/useDietList';
import * as SC from './DietListStyle';

const DietCalorieChart = ({
  food,
  userDietList,
}: {
  food: IFoodList;
  userDietList: IUserDietList;
}) => {
  const init: ICalorieProps = {
    foods: [],
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  };
  return (
    <div>
      {userDietList.data.map((diet) => {
        const calorieChart = diet.meals.map((mealList) => {
          const calorie = mealList.meal_list.reduce((prev, next) => {
            const foodInfo = food.data.find(
              (item) => item.name === next.foodName
            );
            if (foodInfo === undefined) return prev;
            const ratio = (foodInfo.quantity * next.quantity) / 100;
            return {
              foods: [
                ...prev.foods,
                { name: foodInfo.name, value: foodInfo.calories * ratio },
              ],
              carbohydrate: prev.carbohydrate + foodInfo.carbohydrate * ratio,
              protein: prev.protein + foodInfo.protein * ratio,
              fat: prev.fat + foodInfo.fat * ratio,
            };
          }, init);
          return (
            <Calorie
              key={mealList.id}
              foods={calorie.foods}
              carbohydrate={calorie.carbohydrate}
              protein={calorie.protein}
              fat={calorie.fat}
            />
          );
        });
        return <div key={diet.id}>{calorieChart}</div>;
      })}
    </div>
  );
};

const DietList = () => {
  const { food, getFood } = useFood();
  const { userDietList, getDietList } = useDietList();
  // const [calorieList, setCalorieList] = useState<typeof DietCalorieChart>();

  useEffect(() => {
    getFood();
    getDietList();
  }, []);

  // useEffect(() => {
  //   if (food?.status === 200 && userDietList?.status === 200) {
  //     console.log(food.data);
  //     console.log(userDietList.data);
  //     // 이걸 어딘가에 저장하거나 상태관리
  //     setCalorieList();
  //   }
  // }, [userDietList]);

  if (userDietList?.status === 200) {
    console.log(userDietList);
  }

  return (
    <SC.DietListContainer>
      <div>dietList</div>
      {food?.status === 200 && userDietList?.status === 200 && (
        <DietCalorieChart food={food} userDietList={userDietList} />
      )}
      {/* {userDietList?.status === 200 &&
        userDietList.data.map((item, index1) => (
          <div key={`Diet${item.userId}${index1 + 1}`}>
            {item?.meals.map((mealList, index2) => (
              <div key={`Meal${item.userId}${index2 + 1}`}>
                {mealList?.meal_list.map((meal, index3) => (
                  <div key={`Food${item.userId}${index3 + 1}`}>
                    {meal?.foodName}
                  </div>
                ))}
                <br />
              </div>
            ))}
          </div>
        ))} */}
    </SC.DietListContainer>
  );
};

export default DietList;
