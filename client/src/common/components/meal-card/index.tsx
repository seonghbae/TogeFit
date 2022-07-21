import { useState } from 'react';

import { ICalorieProps, IDiet } from 'types/interfaces';
import CalorieChart from 'common/components/calorie-chart/CalorieChart';
import getPadString from 'common/utils/getPadString';

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
  const calories = names.reduce((cal, arr) => cal + arr.value, 0);

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
            <li>총 열량: {getFixedKcal(calories)}kcal</li>
            <li>총 탄수화물: {getFixedKcal(carbohydrate)}g</li>
            <li>총 단백질: {getFixedKcal(protein)}g</li>
            <li>총 지방: {getFixedKcal(fat)}g</li>
          </SC.ListContainer>
          <SC.GoDetail onClick={modalOpen}>상세보기</SC.GoDetail>
        </div>
      </SC.Wrapper>
      {isOpen && <MealModal post={data.rawData} setOpen={setOpen} />}
    </>
  );
};
export default MealCard;
