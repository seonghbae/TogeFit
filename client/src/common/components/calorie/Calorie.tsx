import { CalorieChart } from '..';
import * as SC from './CalorieStyle';

interface CalorieProps {
  foods: Array<{ name: string; value: number }>;
  carbohydrate: number;
  protein: number;
  fat: number;
}

const Calorie = ({ foods, carbohydrate, protein, fat }: CalorieProps) => (
  <SC.CalorieContainer>
    <CalorieChart foods={foods} />
    <ol>
      <li>탄수화물: {carbohydrate}kcal</li>
      <li>단백질: {protein}kcal</li>
      <li>지방: {fat}kcal</li>
    </ol>
  </SC.CalorieContainer>
);

export default Calorie;
