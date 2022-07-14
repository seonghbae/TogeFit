import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  height: 80vh;
  /* width: 80%; */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    border-radius: 10px;
  }
`;

export const RoutineWrapper = styled.div`
  height: 70vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  margin-top: 5%;
  padding-top: 5%;
`;
