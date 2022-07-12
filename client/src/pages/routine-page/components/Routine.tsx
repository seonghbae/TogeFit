import { IRoutinesInfo } from 'types/interfaces';
import { CustomCarousel } from '../../../common/components';
import * as SC from './RoutineStyle';

const Routine = (props: IRoutinesInfo) => {
  const { routine_name: routineName, routine_list: routineList } = props;

  return (
    <SC.Wrapper>
      <span>{routineName}</span>
      <CustomCarousel objData={routineList} />
      <SC.BtnWrapper>
        <button type="button">수정</button>
        <button type="button">삭제</button>
      </SC.BtnWrapper>
    </SC.Wrapper>
  );
};

export default Routine;
