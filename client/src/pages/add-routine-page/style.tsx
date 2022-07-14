import styled from 'styled-components';

export const Wrapper = styled.div`
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
  padding: 1rem;

  & > div {
    margin-top: 5%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const InputWrapper = styled.div`
  padding-top: 3rem;
  width: 90%;
  display: flex;
  font-size: 1.5rem;
  & > input {
    margin-left: 1rem;
    border-bottom: 1px solid;
    padding-left: 1rem;
    width: 80%;
    padding-right: 1rem;
  }
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  & > button {
    padding: 1rem 3rem 1rem 3rem;
    margin: 1rem;
    background-color: #d97d20a4;
    border-radius: 5px;
    transition: all 200ms;
    :hover {
      background-color: ${(props) => props.theme.pointColors.orange};
    }
  }
`;
