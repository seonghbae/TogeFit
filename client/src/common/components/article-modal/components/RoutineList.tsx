import { nanoid } from 'nanoid';
import { IRoutinesInfo } from 'types/interfaces';
import * as SC from './RoutineListStyle';

interface RoutineListProps {
  routineList: IRoutinesInfo[];
}

const RoutineList = ({ routineList }: RoutineListProps) => (
  <SC.Wrapper>
    <SC.RoutineName>{routineList[0].routine_name}</SC.RoutineName>
    <SC.RoutineContainer>
      {routineList[0].routine_list.map((routine) => (
        <div key={nanoid()}>
          <SC.Name>{routine.name}</SC.Name>
          <SC.Set>{routine.set}set</SC.Set>
          <SC.Count>{routine.count}회</SC.Count>
        </div>
      ))}
    </SC.RoutineContainer>
  </SC.Wrapper>
);

export default RoutineList;
