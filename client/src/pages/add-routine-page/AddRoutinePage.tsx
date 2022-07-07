import { CustomCarousel } from 'common/components';
import { useEffect, useRef, useState } from 'react';
import { Header } from './components';
import { Wrapper, RoutineWrapper } from './style';

const isDraggableCarousel = true;
const AddRoutinePage = () => {
  const [dragTarget, setDragTarget] = useState<string | number | null>(null);
  const [exercise, setExercise] = useState<Array<string | number | null>>([
    1, 2, 3, 4, 5,
  ]);
  const [userCustom, setUserCustom] = useState<Array<string | number | null>>([
    '위 운동을 드래그해주세요',
  ]);
  const exerciseListCarousel = useRef<HTMLDivElement>();
  const userCustomCarousel = useRef();

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
        />
      </RoutineWrapper>
    </Wrapper>
  );
};

export default AddRoutinePage;
