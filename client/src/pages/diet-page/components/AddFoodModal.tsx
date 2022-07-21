/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { AlertModal } from 'common/components';
import { IFood } from 'types/interfaces';
import foodListState from '../states/foodListState';
import useFoodAdd from '../hooks/useFoodAdd';
import * as SC from './AddFoodModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodModal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: IProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFood>({ mode: 'onChange' });
  const { showError, message, addFood, setShowError } = useFoodAdd();
  const [food, setFood] = useRecoilState(foodListState);

  const reset = () => {
    resetField('name');
    resetField('carbohydrate');
    resetField('protein');
    resetField('fat');
    resetField('quantity');
    resetField('calories');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsCancel(true);
    reset();
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<IFood> = (data) => {
    addFood(data);
    setFood((cur) => [...cur, data.name]);
    reset();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setShowError(false);
  };

  return (
    <>
      <SC.FoodContainer view={isOpen} onClick={handleCancel}>
        <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
          <h3>음식 추가</h3>
          <div>
            <label htmlFor="name">이름 &nbsp; &nbsp; &nbsp;</label>
            <input type="text" {...register('name', { required: true })} />
            {errors.name && errors.name.type === 'required' && (
              <p>이름을 입력해주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="carbohydrate">탄수화물</label>
            <input
              type="text"
              {...register('carbohydrate', { required: true })}
            />
            {errors.carbohydrate && errors.carbohydrate.type === 'required' && (
              <p>탄수화물의 양을 입력해주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="protein">단백질 &nbsp;&nbsp;</label>
            <input type="text" {...register('protein', { required: true })} />
            {errors.protein && errors.protein.type === 'required' && (
              <p>단백질의 양을 입력해주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="fat">지방 &nbsp; &nbsp; &nbsp;</label>
            <input type="text" {...register('fat', { required: true })} />
            {errors.fat && errors.fat.type === 'required' && (
              <p>지방의 양을 입력해주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="quantity">
              양 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            </label>
            <input type="text" {...register('quantity', { required: true })} />
            {errors.quantity && errors.quantity.type === 'required' && (
              <p>단위 무게를 입력해주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="calories">칼로리 &nbsp;&nbsp;</label>
            <input type="text" {...register('calories', { required: true })} />
            {errors.calories && errors.calories.type === 'required' && (
              <p>칼로리를 입력해주세요.</p>
            )}
          </div>
          <div>
            <button type="submit">확인</button>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </form>
      </SC.FoodContainer>
      {showError && (
        <AlertModal message={message} handleConfirm={handleConfirm} />
      )}
    </>
  );
};

export default AddFoodModal;
