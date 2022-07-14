/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import useExcerciseModify from '../hooks/useExerciseModify';
import { routinesState } from '../states';
import exerciseModifyState from '../states/exerciseModifyState';
import routineModifyState from '../states/routineModifyState';
// isCancel, setIsCancel, open, setOpen, renderConfirmModal
import * as SC from './ModifyRoutineModalStyle';

type Inputs = {
  name: string;
  count: string;
  set: string;
  weight: string;
};
interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel?: boolean;
  setIsCancel?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyRoutineModal = ({
  isOpen,
  setIsOpen,
  isCancel,
  setIsCancel,
}: Iprops) => {
  const { register, handleSubmit, resetField } = useForm<Inputs>();
  const [modifyRoutine, setModifyRoutine] = useRecoilState(routineModifyState);
  const [exerciseModify, setExerciseModify] =
    useRecoilState(exerciseModifyState);
  const [routines, setRoutines] = useRecoilState(routinesState);
  const { modifyExercise, result } = useExcerciseModify();

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
    const routine = { ...modifyRoutine };
    const routineList = [...routine.routine_list];

    routineList[routine.exerciseIndex] = {
      name: data.name || exerciseModify?.name || '',
      count: data.count || exerciseModify?.count || '',
      set: data.set || exerciseModify?.set || '',
      weight: data.weight || exerciseModify?.weight || '',
    };
    const temp = { ...routine, routine_list: routineList };

    const sendData = {
      routineId: temp._id,
      ...temp,
    };
    const cachedData = {
      ...temp,
    };
    // 전체 데이터 호출하지 않고 저장 후 표현
    let routinesTemp;

    if (typeof routines === 'object') {
      routinesTemp = [...routines];
      routinesTemp[cachedData.routineIndex] = {
        routine_name: cachedData.routine_name,
        routine_list: cachedData.routine_list,
        _id: cachedData._id,
      };
    }

    modifyExercise(sendData);

    setRoutines(routinesTemp);

    setIsOpen(false);
  };
  useEffect(() => {
    resetField('count', { defaultValue: exerciseModify?.count });
    resetField('set', { defaultValue: exerciseModify?.set });
    resetField('weight', { defaultValue: exerciseModify?.weight });
  }, [exerciseModify, isOpen]);

  return (
    <SC.Wrapper view={isOpen} onClick={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={handleDivClick}>
        <h3>루틴 수정</h3>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            {...register('name')}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            unselectable={'on'}
            defaultValue={exerciseModify?.name}
            // value={dragTarget !== null ? dragTarget : ''}
          />
        </div>
        <div>
          <label htmlFor="count">개수</label>
          <input
            type="text"
            {...register('count')}
            defaultValue={exerciseModify?.count}
          />
        </div>
        <div>
          <label htmlFor="set">세트</label>
          <input
            type="text"
            {...register('set')}
            defaultValue={exerciseModify?.set}
          />
        </div>
        <div>
          <label htmlFor="weight">무게</label>
          <input
            type="text"
            {...register('weight')}
            defaultValue={exerciseModify?.weight}
          />
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

export default ModifyRoutineModal;
