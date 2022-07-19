import styled from 'styled-components';

export const Wrapper = styled.div``;

export const RoutineName = styled.h3`
  margin: 0;
  margin-bottom: 1rem;
`;

export const RoutineContainer = styled.div`
  display: flex;

  > div + div {
    margin-left: 1rem;
  }
`;

export const Name = styled.h4`
  margin: 0;
`;

export const Set = styled.p`
  margin: 0;
`;

export const Count = styled.p`
  margin: 0;
`;
