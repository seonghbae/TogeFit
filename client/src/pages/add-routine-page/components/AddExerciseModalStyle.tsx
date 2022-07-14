import styled from 'styled-components';

export const Wrapper = styled.div<{ view: boolean }>`
  visibility: ${(props) => (props.view ? '' : 'hidden')};
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 5;
  & > form {
    padding: 1rem;

    border-radius: 10px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  label::after {
    content: ' :';
  }
  input {
    border: 1px dotted;
    margin-left: 0.5rem;
  }
  input[type='button'],
  input[type='submit'] {
    cursor: pointer;
  }
  div {
    margin: 0.5rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 1rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    width: 3rem;
    height: 2rem;
    color: #000000b2;

    border-radius: 1rem;

    :hover {
      background-color: ${(props) => props.theme.pointColors.orange};
      border-radius: 1rem;
      color: #fff;
    }
  }
`;
