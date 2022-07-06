import { SearchForm } from '../../common/components';
import Routine from './components/Routine';
import { RoutineWrapper } from './style';

const RoutinePage = () => (
  <div>
    <SearchForm />
    <RoutineWrapper>
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
    </RoutineWrapper>
  </div>
);

export default RoutinePage;
