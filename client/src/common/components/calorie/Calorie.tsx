import { CalorieChart } from '..';
import Wrapper from './style';

interface CalorieProps {
  foods: Array<{ name: string; value: number }>;
  carbohydrate: number;
  protein: number;
  fat: number;
}

const Calorie = ({ foods, carbohydrate, protein, fat }: CalorieProps) => (
  <Wrapper>
    <CalorieChart foods={foods} />
  </Wrapper>
);

export default Calorie;
