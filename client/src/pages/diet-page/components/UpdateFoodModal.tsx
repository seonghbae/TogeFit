/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IFood, IFoodList } from 'types/interfaces';
import foodListState from '../states/foodListState';
import foodUpdateState from '../states/foodUpdateState';
import useFoodAdd from '../hooks/useFoodAdd';
import * as SC from './UpdateFoodModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  food: IFoodList | undefined;
}

const UpdateFoodModal = ({
  isOpen,
  setIsOpen,
  isCancel,
  setIsCancel,
  food,
}: IProps) => {
  const { register, handleSubmit, resetField } = useForm<IFood>();
  const { addFood } = useFoodAdd();
  const [updateFood, setUpdateFood] = useState<IFood>();
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [foodUpdate, setFoodUpdate] = useRecoilState(foodUpdateState);

  useEffect(() => {
    if (food !== undefined) {
      setUpdateFood(food.data.find((foodItem) => foodItem.name === foodUpdate));
    }
  }, [foodUpdate]);

  const resetValue = () => {
    resetField('name');
    resetField('carbohydrate');
    resetField('protein');
    resetField('fat');
    resetField('quantity');
    resetField('calories');
  };

  const handleCancel = () => {
    resetValue();
    setFoodUpdate('');
    setUpdateFood(undefined);
    setIsOpen(false);
    setIsCancel(true);
  };

  const handleDelete = () => {
    // deleteFood
    resetValue();
    setFoodUpdate('');
    setUpdateFood(undefined);
    setIsOpen(false);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<IFood> = (data) => {
    addFood(data);
    // updateFood(data);
    setFoodList((cur) => [...cur, data.name]);
    resetValue();
    setFoodUpdate('');
    setIsOpen(false);
  };

  return (
    <SC.FoodContainer view={isOpen} onClick={handleCancel}>
      {updateFood !== undefined && (
        <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
          <h3>음식 수정</h3>
          <div>
            <label htmlFor="name">이름 &nbsp; &nbsp; &nbsp;</label>
            <input type="text" value={updateFood.name} {...register('name')} />
          </div>
          <div>
            <label htmlFor="carbohydrate">탄수화물</label>
            <input
              type="text"
              value={updateFood.carbohydrate}
              {...register('carbohydrate')}
            />
          </div>
          <div>
            <label htmlFor="protein">단백질 &nbsp;&nbsp;</label>
            <input
              type="text"
              value={updateFood.protein}
              {...register('protein')}
            />
          </div>
          <div>
            <label htmlFor="fat">지방 &nbsp; &nbsp; &nbsp;</label>
            <input type="text" value={updateFood.fat} {...register('fat')} />
          </div>
          <div>
            <label htmlFor="quantity">
              양 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            </label>
            <input
              type="text"
              value={updateFood.quantity}
              {...register('quantity')}
            />
          </div>
          <div>
            <label htmlFor="calories">칼로리 &nbsp;&nbsp;</label>
            <input
              type="text"
              value={updateFood.calories}
              {...register('calories')}
            />
          </div>
          <div>
            <button type="submit">확인</button>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
            <button type="button">삭제</button>
          </div>
        </form>
      )}
    </SC.FoodContainer>
  );
};

export default UpdateFoodModal;
