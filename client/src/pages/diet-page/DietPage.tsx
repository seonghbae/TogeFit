import Meal from './components/Meal';
import { DietContainer, ButtonWrapper } from './DietPageStyle';

const DietPage = () => {
  const dummyMeal = {
    name: '식사1',
    mealList: [
      { foodName: '닭가슴살', quantity: 150 },
      { foodName: '쌀밥', quantity: 100 },
      { foodName: '바나나', quantity: 100 },
      { foodName: '오트밀', quantity: 100 },
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
    <DietContainer>
      <ButtonWrapper>
        <button type="button">+</button>
      </ButtonWrapper>
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
    </DietContainer>
  );
};

export default DietPage;
