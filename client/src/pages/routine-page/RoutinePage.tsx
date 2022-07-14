/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { CustomCarousel } from 'common/components';
import Modal from 'common/components/alert-modal';
import { getUserId } from 'common/utils/getUserId';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IRoutinesInfo } from 'types/interfaces';
import { Routine, Header, ModifyRoutineModal } from './components';
import useRoutineList from './hooks/useRoutineList';
import { routinesState } from './states';
import routineModifyState from './states/routineModifyState';
import * as SC from './style';

const RoutinePage = () => {
  const { getRoutineList, result } = useRoutineList();
  const [routines, setRoutines] = useRecoilState(routinesState);
  const [modifyRoutine, setModifyRoutine] = useRecoilState(routineModifyState);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    getRoutineList();
  }, []);

  useEffect(() => {
    setRoutines(result?.data.routines);
  }, [result]);

  return (
    <SC.Wrapper>
      <Header />
      <SC.RoutineWrapper>
        {typeof routines === 'object' &&
          routines.map((routine, i) => (
            <Routine
              key={i}
              {...routine}
              index={i}
              isModify={isModify}
              setIsModify={setIsModify}
            />
          ))}
      </SC.RoutineWrapper>
      <ModifyRoutineModal isOpen={isModify} setIsOpen={setIsModify} />
    </SC.Wrapper>
  );
};

export default RoutinePage;
