import { CustomCarousel } from 'common/components';
import { useEffect, useRef, useState } from 'react';
import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';
import { Header } from './components';
import { Wrapper, RoutineWrapper } from './style';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;
const AddRoutinePage = () => {
  const [dragTarget, setDragTarget] = useState<string | number | null>(null);
  const [exercise, setExercise] = useState<Array<string | number | null>>([
    1, 2, 3, 4, 5,
  ]);
  const [userCustom, setUserCustom] = useState<Array<string | number | null>>([
    ROUTINE_INITIAL_MESSAGE,
  ]);

  return (
    <Wrapper>
      <Header />
      <RoutineWrapper>
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
        />
      </RoutineWrapper>
    </Wrapper>
  );
};

export default AddRoutinePage;
