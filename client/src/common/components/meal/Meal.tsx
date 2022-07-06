import Wrapper from './style';

interface MealProps {
  name: string;
  meals: Array<{ foodName: string; quantity: number }>;
}

const Meal = ({ name, meals }: MealProps) => {
  const dummyFood = [
    {
      name: '닭가슴살',
      carbohydrate: 0,
      protein: 100,
      fat: 130,
      quantity: 100,
      calories: 230,
    },
    {
      name: '닭가슴살',
      carbohydrate: 0,
      protein: 100,
      fat: 130,
      quantity: 100,
      calories: 230,
    },
  ];
  return (
    <Wrapper>
      <div>{name}</div>
      <ol>
        {meals.map((meal) => (
          <li key={meal.foodName}>{`${meal.foodName} ${meal.quantity}g`}</li>
        ))}
      </ol>
    </Wrapper>
  );
};

export default Meal;
