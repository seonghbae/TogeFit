import { nanoid } from 'nanoid';
import { MutableRefObject, useEffect, useRef } from 'react';

import { IDiet, ModalCloseEvent } from 'types/interfaces';
import { Loading } from 'common/components';
import useFood from 'pages/diet-page/hooks/useFood';

import CalorieChart from '../calorie-chart/CalorieChart';
import getMealData, { getNutrient } from './util/getMealData';
import * as SC from './style';

interface MealModalProps {
  post: IDiet;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getFixedKcal = (nutrition: number) => nutrition.toFixed(2);

const MealModal = ({ post, setOpen }: MealModalProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const iconRef = useRef() as MutableRefObject<SVGSVGElement>;
  const { meals } = post;
  const { food, getFood, isLoading } = useFood();

  useEffect(() => {
    getFood();
  }, []);

  const handleClose = (e: ModalCloseEvent) => {
    if (e.target === wrapperRef.current || e.target === iconRef.current) {
      setOpen(false);
    }
  };

  return (
    <>
      <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
        <SC.Modal>
          <SC.CloseIcon onClick={handleClose} ref={iconRef} />
          {meals.map((mealList, index) => (
            <SC.MealContainer key={nanoid()}>
              <div>
                <SC.MealName>{`식사 ${index + 1}`}</SC.MealName>
                {mealList.meal_list.map((meal) => (
                  <SC.FoodContainer key={nanoid()}>
                    <SC.FoodName>{meal.foodName}</SC.FoodName>
                    <SC.FoodQuantity>{`${meal.quantity}g`}</SC.FoodQuantity>
                  </SC.FoodContainer>
                ))}
              </div>
              <SC.NutrientContainer>
                {getNutrient(food, mealList.meal_list).map(
                  ([name, value], index2) =>
                    index2 === 0 ? (
                      <li key={nanoid()}>{`총 ${name}: ${getFixedKcal(
                        value
                      )}kcal`}</li>
                    ) : (
                      <li key={nanoid()}>{`총 ${name}: ${getFixedKcal(
                        value
                      )}g`}</li>
                    )
                )}
              </SC.NutrientContainer>
              <CalorieChart foods={getMealData(food, mealList.meal_list)} />
            </SC.MealContainer>
          ))}
        </SC.Modal>
      </SC.Wrapper>
      {isLoading && <Loading />}
    </>
  );
};

export default MealModal;
