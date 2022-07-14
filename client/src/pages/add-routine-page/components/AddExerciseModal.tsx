/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import exerciseState from 'pages/add-routine-page/states/exerciseState';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import useExcerciseAdd from '../hooks/useExerciseAdd';

import * as SC from './AddExerciseModalStyle';

type Inputs = {
  exerciseName: string;
};
interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExerciseModal = ({
  isOpen,
  setIsOpen,
  isCancel,
  setIsCancel,
}: Iprops) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const { addExercise } = useExcerciseAdd();
  const [exercise, setExercise] = useRecoilState(exerciseState);

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
    addExercise(data);
    setExercise((cur) => [...cur, data.exerciseName]);
    setValue('exerciseName', '');
    setIsOpen(false);
  };

  return (
    <SC.Wrapper view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>운동 추가</h3>
        <div>
          <label htmlFor="exerciseName">이름</label>
          <input
            type="text"
            {...register('exerciseName', { required: true, maxLength: 15 })}
          />
          {errors.exerciseName && errors.exerciseName.type === 'required' && (
            <p>이름을 입력해주세요.</p>
          )}
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

export default AddExerciseModal;
