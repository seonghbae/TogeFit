/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import currentTargetState from 'pages/add-routine-page/states/currentTargetState';
import dragTargetState from 'pages/add-routine-page/states/dragTargetState';
import { IMeal } from 'types/interfaces';
import mealListState from '../states/mealListState';
import * as SC from './MealModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealModal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: IProps) => {
  const { register, handleSubmit, resetField } = useForm<IMeal>();
  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [userMeal, setUserMeal] = useRecoilState(mealListState);
  const [currentTarget, setCurrentTarget] = useRecoilState(currentTargetState);

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpen(false);
    setIsCancel(true);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<IMeal> = (data) => {
    const temp = [...userMeal];

    temp[currentTarget] = {
      ...temp[currentTarget],
      foodName: String(dragTarget || ''),
      quantity: data.quantity,
    };
    resetField('foodName');
    resetField('quantity');
    setUserMeal(temp);
    setIsOpen(false);
  };

  return (
    <SC.MealWrapper view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>음식 상세정보</h3>
        <div>
          <span>{dragTarget}</span>
        </div>
        <div>
          <label htmlFor="quantity">양 &nbsp;&nbsp;</label>
          <input type="input" {...register('quantity')} />
        </div>
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </SC.MealWrapper>
  );
};

export default MealModal;
