/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IFood } from 'types/interfaces';
import routineState from '../states/routineState';
import * as SC from './RoutineModalStyle';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const routineModal = ({ isOpen, setIsOpen, isCancel, setIsCancel }: IProps) => {
  const { handleSubmit } = useForm<IFood>();
  const [routine, setRoutine] = useRecoilState(routineState);

  const handleCancel = () => {
    setRoutine({
      routine_name: '',
      routine_list: [],
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

  return (
    <SC.RoutineContainer view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>{routine.routine_name}</h3>
        {routine.routine_list.map((routineItem) => (
          <>
            <div key={routineItem._id}>{routineItem.name}</div>
            <div>
              {routineItem.count}개 {routineItem.set}세트 {routineItem.weight}kg
            </div>
          </>
        ))}
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </SC.RoutineContainer>
  );
};

export default routineModal;
