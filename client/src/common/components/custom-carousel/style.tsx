import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number }>`
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

export const Slide = styled.div`
  align-items: center;
  text-align: center;
  & > h3 {
    text-align: center;
    height: 2rem;
  }
  input {
    border: 1px solid;
    width: 3rem;
  }

  .info {
    /* border: none; */
    /* display: none; */
  }
`;
