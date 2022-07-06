import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  width: 80%;
`;

const RoutineWrapper = styled.div`
  height: 100vh;
  & > div {
    margin-top: 5%;
  }
`;

export { Wrapper, RoutineWrapper };
