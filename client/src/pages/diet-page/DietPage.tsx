import { Meal } from '../../common/components';

const DietPage: React.FC = () => {
  const dummyMeal = {
    name: '식사1',
    meals: [
      { foodName: '닭가슴살', quantity: 150 },
      { foodName: '쌀밥', quantity: 100 },
    ],
  };
  return (
    <div>
      <Meal name={dummyMeal.name} meals={dummyMeal.meals} />
    </div>
  );
};

export default DietPage;
