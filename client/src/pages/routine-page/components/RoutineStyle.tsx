import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  & > span {
    position: absolute;
    left: 5%;
    top: -30%;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  & > button {
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid;
    height: 2rem;
    width: 3rem;
  }
`;

export { Wrapper, BtnWrapper };
