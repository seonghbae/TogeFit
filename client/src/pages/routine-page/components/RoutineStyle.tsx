import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  padding-bottom: 2%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
`;

export const Label = styled.div`
  position: absolute;
  font-size: 1.3rem;
  left: 5%;
  top: -2.5rem;
  width: 15rem;
  overflow: scroll;
  padding: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 5%;
  margin-right: 5%;

  & > button {
    height: 3rem;
    /* background-color: rgba(0, 0, 0, 0.1); */
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    transition: all 200ms;
  }

  & > button:hover {
    background-color: rgba(179, 58, 58, 0.547);
    color: #fff;
    border-radius: 1rem;
  }
`;
