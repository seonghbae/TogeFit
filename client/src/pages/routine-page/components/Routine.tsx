import { CustomCarousel } from '../../../common/components';
import { Wrapper, BtnWrapper } from './RoutineStyle';

const Routine = () => (
  <Wrapper>
    <span>나만의 가슴운동</span>
    <CustomCarousel data={[1, 2, 3, 4, 5, 6]} />
    <BtnWrapper>
      <button type="button">수정</button>
      <button type="button">삭제</button>
    </BtnWrapper>
  </Wrapper>
);

export default Routine;
