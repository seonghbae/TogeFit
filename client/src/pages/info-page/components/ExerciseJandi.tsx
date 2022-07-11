import {
  Wrapper,
  DaySpan,
  JandiContainer,
  Title,
  JandiItem,
} from './ExerciseJandiStyle';

const ExerciseJandi = () => (
  <Wrapper>
    <Title>2022.07</Title>
    <DaySpan>Sun</DaySpan>
    <DaySpan sat>Sat</DaySpan>
    <JandiContainer>
      {Array(30)
        .fill(0)
        .map(() => (
          <JandiItem key={Math.random()} />
        ))}
    </JandiContainer>
  </Wrapper>
);

export default ExerciseJandi;
