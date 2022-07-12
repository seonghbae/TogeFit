import { Link } from 'react-router-dom';
import Meal from './Meal';
import * as SC from './DietInfoStyle';

const DietInfo = () => {
  const dummyMeal = {
    name: '식사1',
    mealList: [
      { foodName: '닭가슴살', quantity: 150, id: 'a' },
      { foodName: '쌀밥', quantity: 100, id: 'b' },
      { foodName: '바나나', quantity: 100, id: 'c' },
      { foodName: '오트밀', quantity: 100, id: 'd' },
    ],
  };

  const dummyDiet = {
    userId: 'user1',
    meals: [
      {
        mealList: [
          { foodName: '닭가슴살', quantity: 150, id: 'a' },
          { foodName: '쌀밥', quantity: 100, id: 'b' },
          { foodName: '바나나', quantity: 100, id: 'c' },
          { foodName: '오트밀', quantity: 100, id: 'd' },
        ],
        id: 1,
      },
      {
        mealList: [
          { foodName: '닭가슴살', quantity: 200, id: 'e' },
          { foodName: '쌀밥', quantity: 150, id: 'f' },
          { foodName: '바나나', quantity: 80, id: 'g' },
          { foodName: '오트밀', quantity: 50, id: 'h' },
        ],
        id: 2,
      },
    ],
  };

  return (
    <SC.DietInfoContainer>
      <Link to="/diet/add">
        <SC.ButtonWrapper>
          <button type="button">+</button>
        </SC.ButtonWrapper>
      </Link>
      {dummyDiet.meals.map((meal, index) => (
        <Meal
          key={meal.id}
          name={`식사${index + 1}`}
          mealList={meal.mealList}
        />
      ))}
      <Meal name={dummyMeal.name} mealList={dummyMeal.mealList} />
      <Meal name={dummyMeal.name} mealList={dummyMeal.mealList} />
      <Meal name={dummyMeal.name} mealList={dummyMeal.mealList} />
      <Meal name={dummyMeal.name} mealList={dummyMeal.mealList} />
      <Meal name={dummyMeal.name} mealList={dummyMeal.mealList} />
    </SC.DietInfoContainer>
  );
};

export default DietInfo;
