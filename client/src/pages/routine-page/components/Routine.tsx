import { CustomCarousel } from '../../../common/components';
import * as SC from './RoutineStyle';

const Routine = () => (
  <SC.Wrapper>
    <span>나만의 가슴운동</span>
    <CustomCarousel data={['1', '2', '3', '4', '5', '6']} />
    <SC.BtnWrapper>
      <button type="button">수정</button>
      <button type="button">삭제</button>
    </SC.BtnWrapper>
  </SC.Wrapper>
);

export default Routine;
