import { CustomCarousel } from 'common/components';

import { useEffect, useState } from 'react';
import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';

import { exerciseState } from 'pages/add-routine-page/states';
import { useRecoilState } from 'recoil';

import { Header } from './components';
import useExcerciseList from './hooks/useExcerciseList';
import AddRoutineModal from './components/AddRoutineModal';

import * as SC from './style';
import dragTargetState from './states/dragTargetState';
import userRoutineState from './states/userRoutineState';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;

type Idata = {
  name: string;
  count?: string;
  set?: string;
  weight?: string;
};

const AddRoutinePage = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [exercise, setExercise] = useRecoilState(exerciseState);

  const [userRoutine, setUserRoutine] = useRecoilState(userRoutineState);

  const [cache, setCache] = useState<Idata[]>([
    {
      name: ROUTINE_INITIAL_MESSAGE,
    },
  ]);

  const { result, getExcerciseList } = useExcerciseList();

  useEffect(() => {
    if (isCancel) {
      setUserRoutine([...cache]);
      setIsCancel(false);
    }
  }, [isCancel]);

  useEffect(() => {
    getExcerciseList();
  }, []);

  useEffect(() => {
    if (result?.status === 200) {
      const excerciseList = result.data.map((item) => item.name);
      setExercise(excerciseList);
    }
  }, [result]);

  useEffect(() => {
    console.log(userRoutine);
  }, [userRoutine]);
  return (
    <SC.Wrapper>
      <Header />
      <SC.RoutineWrapper>
        <CustomCarousel
          data={exercise}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          setData={setExercise}
        />
        <CustomCarousel
          objData={userRoutine}
          setObjData={setUserRoutine}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          modifyFlag={isUserCustomCarousel}
          setModalView={setIsOpen}
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          objCache={userRoutine}
          setObjCache={setUserRoutine}
        />
      </SC.RoutineWrapper>
      <SC.ButtonWrapper>
        <button type="button">확인</button>
        <button type="button">취소</button>
      </SC.ButtonWrapper>
      <AddRoutineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.Wrapper>
  );
};

export default AddRoutinePage;
