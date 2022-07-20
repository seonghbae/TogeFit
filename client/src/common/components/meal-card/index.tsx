import { ICalorieProps, IDiet } from 'types/interfaces';
import CalorieChart from 'common/components/calorie-chart/CalorieChart';
import getPadString from 'common/utils/getPadString';
import { useState } from 'react';
import * as SC from './style';
import MealModal from '../meal-modal';

interface DataTypes {
  reducedMealList: ICalorieProps;
  date: string;
  rawData: IDiet;
}

export interface MealCardProps {
  data: DataTypes;
}

const getFixedKcal = (nutrition: number) => nutrition.toFixed(2);

const MealCard = ({ data }: MealCardProps) => {
  const { carbohydrate, protein, fat, names } = data.reducedMealList;
  const createdDate = new Date(data.date);
  const [isOpen, setOpen] = useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <SC.Wrapper>
        <div>
          <SC.Date>
            {`${createdDate.getMonth() + 1}/${getPadString(
              createdDate.getDate(),
              2
            )}`}
          </SC.Date>
          <CalorieChart foods={names} />
        </div>
        <div>
          <SC.ListContainer>
            <li>총 탄수화물: {getFixedKcal(carbohydrate)}kcal</li>
            <li>총 단백질: {getFixedKcal(protein)}kcal</li>
            <li>총 지방: {getFixedKcal(fat)}kcal</li>
          </SC.ListContainer>
          <SC.GoDetail onClick={modalOpen}>상세보기</SC.GoDetail>
        </div>
      </SC.Wrapper>
      {isOpen && <MealModal post={data.rawData} />}
    </>
  );
};
export default MealCard;
