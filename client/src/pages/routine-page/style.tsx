import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  height: 100vh;
  /* width: 80%; */
`;

const RoutineWrapper = styled.div`
  height: 80vh;
  overflow: scroll;
  margin-top: 3%;
  margin-bottom: 3%;
  padding-right: 1rem;
  & > div {
    margin-top: 5%;
  }
`;

export { Wrapper, RoutineWrapper };
