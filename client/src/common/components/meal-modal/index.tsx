import { nanoid } from 'nanoid';
import { IDiet } from 'types/interfaces';
import * as SC from './style';

interface MealModalProps {
  post: IDiet;
}

const MealModal = ({ post }: MealModalProps) => {
  const { meals } = post;

  return (
    <SC.Wrapper>
      <SC.Modal>
        <SC.CloseIcon />
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
