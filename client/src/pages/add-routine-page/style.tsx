import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  /* height: 100vh; */
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RoutineWrapper = styled.div`
  /* height: 80vh; */
  width: 100%;
  overflow: scroll;

  margin-bottom: 3%;
  padding-right: 1rem;
  & > div {
    margin-top: 5%;
  }
`;

export const InputWrapper = styled.div`
  padding-top: 3rem;
  width: 90%;
  display: flex;
  font-size: 1.5rem;
  & > input {
    border-bottom: 1px solid;
    padding-left: 1rem;
    width: 80%;
    padding-right: 1rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  & > button {
    padding: 1rem 3rem 1rem 3rem;
    margin: 1rem;
    background-color: aliceblue;
  }
`;
