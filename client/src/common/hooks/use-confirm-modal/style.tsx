import styled from 'styled-components';

const Wrapper = styled.div<{ view: boolean }>`
  visibility: ${(props) => (props.view ? '' : 'hidden')};
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  & > div {
    padding: 2rem;
    border: 1px solid;
    background-color: aliceblue;
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

export default Wrapper;
