import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number }>`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  /* background-color: ${(props) => props.theme.pointColors.beige}; */
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 5px;
  width: ${(props) => props.width}%;
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

export const Slide = styled.div`
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 200ms all;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  & > h3 {
    text-align: center;
    height: 2rem;
  }
  input {
    border: 1px solid;
    width: 3rem;
  }
`;
