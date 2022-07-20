/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IFood } from 'types/interfaces';
import dietState from 'pages/diet-page/states/dietState';
import * as SC from './MealModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealModal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: IProps) => {
  const { handleSubmit } = useForm<IFood>();
  const [food, setFood] = useRecoilState(dietState);

  const handleCancel = () => {
    setFood({
      userId: '',
      meals: [],
      createdAt: '',
      _id: '',
    });
    setIsOpen(false);
    setIsCancel(true);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<IFood> = () => {
    setIsOpen(false);
  };

  const date = new Date(food.createdAt);
  const dateInfo = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <SC.MealContainer view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>{dateInfo}</h3>
        {food.meals.map((mealList, index) => (
          <>
            <div key={mealList._id}>{`식사${index + 1}`}</div>
            {mealList.meal_list.map((meal) => (
              <div key={meal.foodName}>
                {meal.foodName} {meal.quantity}g
              </div>
            ))}
          </>
        ))}
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </SC.MealContainer>
  );
};

export default MealModal;
