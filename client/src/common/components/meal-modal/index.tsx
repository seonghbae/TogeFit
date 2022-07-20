import { nanoid } from 'nanoid';
import { IDiet, ModalCloseEvent } from 'types/interfaces';
import useFood from 'pages/diet-page/hooks/useFood';
import { MutableRefObject, useEffect, useRef } from 'react';
import * as SC from './style';

interface MealModalProps {
  post: IDiet;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealModal = ({ post, setOpen }: MealModalProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { meals } = post;
  const { food, getFood } = useFood();

  useEffect(() => {
    getFood();
  }, []);

  const handleClose = (e: ModalCloseEvent) => {
    if (e.target === wrapperRef.current || e.target instanceof SVGElement) {
      setOpen(false);
    }
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      <SC.Modal>
        <SC.CloseIcon onClick={handleClose} />
        {meals.map((mealList, index) => (
          <SC.MealContainer key={nanoid()}>
            <SC.MealName>{`식사 ${index + 1}`}</SC.MealName>
            {mealList.meal_list.map((meal) => (
              <SC.FoodContainer key={nanoid()}>
                <SC.FoodName>{meal.foodName}</SC.FoodName>
                <SC.FoodQuantity>{`${meal.quantity}g`}</SC.FoodQuantity>
              </SC.FoodContainer>
            ))}
          </SC.MealContainer>
        ))}
      </SC.Modal>
    </SC.Wrapper>
  );
};

export default MealModal;
