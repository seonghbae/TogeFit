import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  height: 100vh;
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RoutineWrapper = styled.div`
  /* height: 80vh; */
  width: 100%;
  overflow: scroll;
  margin-top: 3%;
  margin-bottom: 3%;
  padding-right: 1rem;
  & > div {
    margin-top: 5%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  & > button {
    padding: 1rem 3rem 1rem 3rem;
    margin: 1rem;
    background-color: aliceblue;
  }
`;

export { Wrapper, RoutineWrapper, ButtonWrapper };
