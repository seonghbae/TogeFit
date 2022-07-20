import { nanoid } from 'nanoid';
import { IDiet, ModalCloseEvent } from 'types/interfaces';
import useFood from 'pages/diet-page/hooks/useFood';
import { MutableRefObject, useEffect, useRef } from 'react';
import CalorieChart from '../calorie-chart/CalorieChart';
import * as SC from './style';
import getMealData from './util/getMealData';

interface MealModalProps {
  post: IDiet;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealModal = ({ post, setOpen }: MealModalProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const iconRef = useRef() as MutableRefObject<SVGSVGElement>;
  const { meals } = post;
  const { food, getFood } = useFood();

  useEffect(() => {
    getFood();
  }, []);

  const handleClose = (e: ModalCloseEvent) => {
    if (e.target === wrapperRef.current || e.target === iconRef.current) {
      setOpen(false);
    }
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      <SC.Modal>
        <SC.CloseIcon onClick={handleClose} ref={iconRef} />
        {meals.map((mealList, index) => (
          <SC.MealContainer key={nanoid()}>
            <SC.MealName>{`식사 ${index + 1}`}</SC.MealName>
            {mealList.meal_list.map((meal) => (
              <SC.FoodContainer key={nanoid()}>
                <SC.FoodName>{meal.foodName}</SC.FoodName>
                <SC.FoodQuantity>{`${meal.quantity}g`}</SC.FoodQuantity>
              </SC.FoodContainer>
            ))}
            <CalorieChart foods={getMealData(food, mealList.meal_list)} />
          </SC.MealContainer>
        ))}
      </SC.Modal>
    </SC.Wrapper>
  );
};

export default MealModal;
