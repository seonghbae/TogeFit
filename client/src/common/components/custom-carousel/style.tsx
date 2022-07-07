import styled from 'styled-components';

const Wrapper = styled.div<{ width: number }>`
  border: 1px solid #000;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;

  width: ${(props) => props.width}%;
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

const Slide = styled.div`
  & > h3 {
    text-align: center;

    height: 3rem;
  }
`;

export { Wrapper, Slide };
