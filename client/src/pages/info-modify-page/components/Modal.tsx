/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IRoutinesExerciseInfo } from 'types/interfaces';

// isCancel, setIsCancel, open, setOpen, renderConfirmModal
import * as SC from './ModalStyle';

interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel?: boolean;
  setIsCancel?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: Iprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoutinesExerciseInfo>();

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpen(false);
    if (setIsCancel) setIsCancel(true);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('test');
  };

  return (
    <SC.Wrapper view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>루틴 수정</h3>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            {...register('name', { required: true })}
            unselectable="on"
          />
        </div>
        <div>
          <label htmlFor="count">개수</label>
          <input
            type="number"
            {...register('count', { min: 0, pattern: /^[0-9]/g })}
          />
          {errors.count && errors.count.type === 'min' && (
            <p>0 이상의 수를 입력하세요.</p>
          )}
          {errors.count && errors.count.type === 'pattern' && (
            <p>숫자만 입력해주세요.</p>
          )}
        </div>
        <div>
          <label htmlFor="set">세트</label>
          <input
            type="number"
            {...register('set', { min: 0, pattern: /^[0-9]/g })}
          />
          {errors.set && errors.set.type === 'min' && (
            <p>0 이상의 수를 입력하세요.</p>
          )}
          {errors.set && errors.set.type === 'pattern' && (
            <p>숫자만 입력해주세요.</p>
          )}
        </div>
        <div>
          <label htmlFor="weight">무게</label>
          <input
            type="number"
            {...register('weight', { min: 0, pattern: /^[0-9]/g })}
          />
          {errors.weight && errors.weight.type === 'min' && (
            <p>0 이상의 수를 입력하세요.</p>
          )}
          {errors.weight && errors.weight.type === 'pattern' && (
            <p>숫자만 입력해주세요.</p>
          )}
        </div>
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </SC.Wrapper>
  );
};

export default Modal;
