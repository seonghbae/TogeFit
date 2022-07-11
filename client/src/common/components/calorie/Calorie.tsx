import { CalorieChart } from '..';
import CalorieContainer from './CalorieStyle';

interface CalorieProps {
  foods: Array<{ name: string; value: number }>;
  carbohydrate: number;
  protein: number;
  fat: number;
}

const Calorie = ({ foods, carbohydrate, protein, fat }: CalorieProps) => (
  <CalorieContainer>
    <CalorieChart foods={foods} />
    <ol>
      <li>탄수화물: {carbohydrate}kcal</li>
      <li>단백질: {protein}kcal</li>
      <li>지방: {fat}kcal</li>
    </ol>
  </CalorieContainer>
);

export default Calorie;
