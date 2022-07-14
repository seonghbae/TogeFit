/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
import Modal from 'common/components/alert-modal';
import React, { MouseEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IRoutinesInfo } from 'types/interfaces';
import { CustomCarousel } from '../../../common/components';
import useRoutineDelete from '../hooks/useRoutineDelete';
import { routinesState } from '../states';
import routineModifyState from '../states/routineModifyState';
import * as SC from './RoutineStyle';

interface IRoutineProps extends IRoutinesInfo {
  index: number;
  isModify: boolean;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Routine = (props: IRoutineProps) => {
  const {
    routine_name: routineName,
    routine_list: routineList,
    _id: id,
    index,
    isModify,
    setIsModify,
  } = props;
  const [modifyRoutine, setModifyRoutine] = useRecoilState(routineModifyState);
  const [routines, setRoutines] = useRecoilState(routinesState);
  const { deleteRoutine, result } = useRoutineDelete();
  const handleModify = () => {
    setIsModify(true);
  };

  const handleDelete = () => {
    if (routines) {
      deleteRoutine({ routineId: routines[index]._id });
    }
  };

  return (
    <SC.Wrapper className="routine">
      <span>{routineName}</span>
      <CustomCarousel
        objData={routineList}
        isModify
        index={index}
        setIsModify={() => handleModify()}
      />
      <SC.BtnWrapper>
        <button type="button" onClick={handleDelete}>
          삭제
        </button>
      </SC.BtnWrapper>
    </SC.Wrapper>
  );
};

export default Routine;
