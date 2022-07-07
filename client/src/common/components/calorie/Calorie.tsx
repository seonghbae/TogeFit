import { CalorieChart } from '..';
import Wrapper from './CalorieStyle';

interface CalorieProps {
  foods: Array<{ name: string; value: number }>;
  carbohydrate: number;
  protein: number;
  fat: number;
}

const Calorie = ({ foods, carbohydrate, protein, fat }: CalorieProps) => (
  <Wrapper>
    <CalorieChart foods={foods} />
    <div>
      <p>탄수화물: {carbohydrate}kcal</p>
      <p>단백질: {protein}kcal</p>
      <p>지방: {fat}kcal</p>
    </div>
  </Wrapper>
);

export default Calorie;
