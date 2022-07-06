import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;

  width: 80%;
`;

const Slide = styled.div`
  & > h3 {
    text-align: center;
  }
`;

export { Wrapper, Slide };
