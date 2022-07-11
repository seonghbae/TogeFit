import { CustomCarousel } from 'common/components';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';
import { useConfirmModal, usePrevious } from 'common/hooks';
import { Header, RoutineModal } from './components';
import * as SC from './style';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;

const AddRoutinePage = () => {
  const { isCancel, setIsCancel, open, setOpen, renderConfirmModal } =
    useConfirmModal({
      childComponent: RoutineModal,
      handleConfirmFunc: () => {
        console.log('something logic');
      },
    });
  const [dragTarget, setDragTarget] = useState<string | number | null>(null);
  // 운동목록
  const [exercise, setExercise] = useState<Array<string | number | null>>([
    1, 2, 3, 4, 5,
  ]);

  // 유저가 운동목록에서 드래그해서 가져오는 부분
  const [userCustom, setUserCustom] = useState<Array<string | number | null>>([
    ROUTINE_INITIAL_MESSAGE,
  ]);

  const [cache, setCache] = useState<Array<string | number | null>>([
    ROUTINE_INITIAL_MESSAGE,
  ]);

  useEffect(() => {
    if (isCancel) {
      setUserCustom([...cache]);
      setIsCancel(false);
    }
  }, [isCancel]);

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
          data={userCustom}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          setData={setUserCustom}
          modifyFlag={isUserCustomCarousel}
          setModalView={setOpen}
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          setCache={setCache}
          cache={cache}
        />
      </SC.RoutineWrapper>
      <SC.ButtonWrapper>
        <button type="button">확인</button>
        <button type="button">취소</button>
      </SC.ButtonWrapper>
      {renderConfirmModal()}
    </SC.Wrapper>
  );
};

export default AddRoutinePage;
