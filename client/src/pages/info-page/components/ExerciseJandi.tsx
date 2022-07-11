import * as SC from './ExerciseJandiStyle';

const ExerciseJandi = () => (
  <SC.Wrapper>
    <SC.Title>2022.07</SC.Title>
    <SC.DaySpan>Sun</SC.DaySpan>
    <SC.DaySpan sat>Sat</SC.DaySpan>
    <SC.JandiContainer>
      {Array(30)
        .fill(0)
        .map(() => (
          <SC.JandiItem key={Math.random()} />
        ))}
    </SC.JandiContainer>
  </SC.Wrapper>
);

export default ExerciseJandi;
