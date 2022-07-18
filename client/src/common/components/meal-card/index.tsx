import { ICalorieProps } from 'types/interfaces';
import CalorieChart from 'common/components/calorie-chart/CalorieChart';
import * as SC from './style';

interface DataTypes {
  reducedMealList: ICalorieProps;
  date: string;
}

interface MealCardProps {
  data: DataTypes;
}

const MealCard = ({ data }: MealCardProps) => {
  const date = new Date(data.date);

  return (
    <SC.Wrapper>
      {`${date.getMonth() + 1}/${date.getDate()}`}
      <CalorieChart foods={data.reducedMealList.names} />
    </SC.Wrapper>
  );
};
export default MealCard;
