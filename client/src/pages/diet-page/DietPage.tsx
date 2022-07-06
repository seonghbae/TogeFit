import Meal from './components/Meal';

const DietPage = () => {
  const dummyMeal = {
    name: '식사1',
    meals: [
      { foodName: '닭가슴살', quantity: 150 },
      { foodName: '쌀밥', quantity: 100 },
      { foodName: '바나나', quantity: 100 },
      { foodName: '오트밀', quantity: 100 },
    ],
  };
  return (
    <div>
      <Meal name={dummyMeal.name} meals={dummyMeal.meals} />
    </div>
  );
};

export default DietPage;
