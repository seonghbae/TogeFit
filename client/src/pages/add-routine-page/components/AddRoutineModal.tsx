/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import currentTargetState from '../states/currentTargetState';
import dragTargetState from '../states/dragTargetState';
import userRoutineState from '../states/userRoutineState';
import * as SC from './AddRoutineModalStyle';
// isCancel, setIsCancel, open, setOpen, renderConfirmModal

type Inputs = {
  name: string;
  count: string;
  set: string;
  weight: string;
};
interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRoutineModal = ({
  isOpen,
  setIsOpen,
  isCancel,
  setIsCancel,
}: Iprops) => {
  const { register, handleSubmit, resetField } = useForm<Inputs>();
  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [userRoutine, setUserRoutine] = useRecoilState(userRoutineState);
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

  const onSubmit: SubmitHandler<any> = (data) => {
    const temp = [...userRoutine];

    temp[currentTarget] = {
      ...temp[currentTarget],
      count: data.count,
      set: data.set,
      weight: data.weight,
    };
    resetField('count');
    resetField('set');
    resetField('weight');
    setUserRoutine(temp);
    setIsOpen(false);
  };

  return (
    <SC.Wrapper view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>내 루틴에 추가하기</h3>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            {...register('name', { required: true, maxLength: 15 })}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            unselectable={'on'}
            value={dragTarget !== null ? dragTarget : ''}
          />
        </div>
        <div>
          <label htmlFor="count">개수</label>
          <input type="text" {...register('count', { min: 0 })} />
        </div>
        <div>
          <label htmlFor="set">세트</label>
          <input type="text" {...register('set', { min: 0 })} />
        </div>
        <div>
          <label htmlFor="weight">무게</label>
          <input type="text" {...register('weight', { min: 0 })} />
        </div>
        <SC.ButtonWrapper>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </SC.ButtonWrapper>
      </form>
    </SC.Wrapper>
  );
};

export default AddRoutineModal;
