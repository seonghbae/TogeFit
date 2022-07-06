import { CustomCarousel } from 'common/components';
import { Header } from './components';
import { Wrapper, RoutineWrapper } from './style';

const isDraggableCarousel = true;
const AddRoutinePage = () => (
  <Wrapper>
    <Header />
    <RoutineWrapper>
      <CustomCarousel
        data={[1, 2, 3, 4, 5, 6]}
        draggable={isDraggableCarousel}
        width={90}
      />
      <CustomCarousel
        data={['위 운동을 드래그해주세요']}
        draggable={isDraggableCarousel}
        width={90}
      />
    </RoutineWrapper>
  </Wrapper>
);

export default AddRoutinePage;
