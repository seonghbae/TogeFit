import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  height: 80vh;
  /* width: 80%; */
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const RoutineWrapper = styled.div`
  height: 70vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  margin-bottom: 3%;
  padding-right: 1rem;
  & > div {
    margin-top: 8%;
  }
`;
