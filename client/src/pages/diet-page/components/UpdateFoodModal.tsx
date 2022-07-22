/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IFood, IFoodList } from 'types/interfaces';
import foodListState from '../states/foodListState';
import foodUpdateState from '../states/foodUpdateState';
import useFoodUpdate from '../hooks/useFoodUpdate';
import useFoodDelete from '../hooks/useFoodDelete';
import * as SC from './UpdateFoodModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  food: IFoodList;
}

const UpdateFoodModal = ({
  isOpen,
  setIsOpen,
  isCancel,
  setIsCancel,
  food,
}: IProps) => {
  const initFood = {
    name: '',
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    quantity: 0,
    calories: 0,
    _id: '',
  };
  const { register, handleSubmit, resetField, setValue } = useForm<IFood>();
  const { updateFood } = useFoodUpdate();
  const { deleteFood } = useFoodDelete();
  const [modifiedFood, setModifiedFood] = useState<IFood>(initFood);
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [foodUpdate, setFoodUpdate] = useRecoilState(foodUpdateState);
  const navigate = useNavigate();

  useEffect(() => {
    const patchFood = food.data.find(
      (foodItem) => foodItem.name === foodUpdate
    );
    if (patchFood !== undefined) {
      setModifiedFood(patchFood);
    }
  }, [foodUpdate]);

  useEffect(() => {
    resetField('name', { defaultValue: modifiedFood.name });
    resetField('carbohydrate', { defaultValue: modifiedFood.carbohydrate });
    resetField('protein', { defaultValue: modifiedFood.protein });
    resetField('fat', { defaultValue: modifiedFood.fat });
    resetField('quantity', { defaultValue: modifiedFood.quantity });
    resetField('calories', { defaultValue: modifiedFood.calories });
  }, [modifiedFood]);

  type nameTypes =
    | 'name'
    | 'carbohydrate'
    | 'protein'
    | 'fat'
    | 'quantity'
    | 'calories';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: nameTypes
  ) => {
    setValue(type, e.target.value);
  };

  const handleCancel = () => {
    setFoodUpdate('');
    setModifiedFood(initFood);
    setIsOpen(false);
    setIsCancel(true);
  };

  const handleDelete = () => {
    deleteFood({ foodId: modifiedFood?._id });
    setFoodUpdate('');
    setModifiedFood(initFood);
    setIsOpen(false);
    navigate('/diet/add');
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<IFood> = (data) => {
    updateFood({ ...data, foodId: modifiedFood?._id });
    setFoodList((cur) => [...cur, data.name]);
    setFoodUpdate('');
    setIsOpen(false);
    navigate('/diet/add');
  };

  return (
    <SC.FoodContainer view={isOpen} onClick={handleCancel}>
      {modifiedFood !== undefined && (
        <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
          <h3>음식 수정</h3>
          <div>
            <label htmlFor="name">이름 &nbsp; &nbsp; &nbsp;</label>
            <input
              type="text"
              {...register('name', {
                onChange: (e) => handleChange(e, 'name'),
              })}
            />
          </div>
          <div>
            <label htmlFor="carbohydrate">탄수화물</label>
            <input
              type="text"
              {...register('carbohydrate', {
                onChange: (e) => handleChange(e, 'carbohydrate'),
              })}
            />
          </div>
          <div>
            <label htmlFor="protein">단백질 &nbsp;&nbsp;</label>
            <input
              type="text"
              {...register('protein', {
                onChange: (e) => handleChange(e, 'protein'),
              })}
            />
          </div>
          <div>
            <label htmlFor="fat">지방 &nbsp; &nbsp; &nbsp;</label>
            <input
              type="text"
              {...register('fat', {
                onChange: (e) => handleChange(e, 'fat'),
              })}
            />
          </div>
          <div>
            <label htmlFor="quantity">
              양 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            </label>
            <input
              type="text"
              {...register('quantity', {
                onChange: (e) => handleChange(e, 'quantity'),
              })}
            />
          </div>
          <div>
            <label htmlFor="calories">칼로리 &nbsp;&nbsp;</label>
            <input
              type="text"
              {...register('calories', {
                onChange: (e) => handleChange(e, 'calories'),
              })}
            />
          </div>
          <div>
            <button type="submit">확인</button>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
            <button type="button" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </form>
      )}
    </SC.FoodContainer>
  );
};

export default UpdateFoodModal;
