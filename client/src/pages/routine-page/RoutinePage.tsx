import { Routine, Header } from './components';
import * as SC from './style';

const RoutinePage = () => (
  <SC.Wrapper>
    <Header />
    <SC.RoutineWrapper>
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
    </SC.RoutineWrapper>
  </SC.Wrapper>
);

export default RoutinePage;
