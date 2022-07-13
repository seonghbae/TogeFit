/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import foodListState from '../states/foodListState';
import useFoodAdd from '../hooks/useFoodAdd';
import * as SC from './FoodModalStyle';

type Food = {
  name: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  quantity: number;
  calories: number;
};

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodModal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: IProps) => {
  const { register, handleSubmit, setValue } = useForm<Food>();
  const { addFood } = useFoodAdd();
  const [food, setFood] = useRecoilState(foodListState);

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

  const onSubmit: SubmitHandler<Food> = (data) => {
    addFood(data);
    setFood((cur) => [...cur, data.name]);
    setValue('name', '');
    setIsOpen(false);
  };

  return (
    <SC.FoodContainer view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>음식 추가</h3>
        <div>
          <label htmlFor="name">이름</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label htmlFor="carbohydrate">탄수화물</label>
          <input type="text" {...register('carbohydrate')} />
        </div>
        <div>
          <label htmlFor="protein">단백질</label>
          <input type="text" {...register('protein')} />
        </div>
        <div>
          <label htmlFor="fat">지방</label>
          <input type="text" {...register('fat')} />
        </div>
        <div>
          <label htmlFor="quantity">양</label>
          <input type="text" {...register('quantity')} />
        </div>
        <div>
          <label htmlFor="calories">칼로리</label>
          <input type="text" {...register('calories')} />
        </div>
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </SC.FoodContainer>
  );
};

export default AddFoodModal;
