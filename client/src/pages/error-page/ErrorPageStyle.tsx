import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: auto;
    padding: 100px 200px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
`;

export const Header = styled.h1`
  font-size: 2.2rem;
`;

export const Content = styled.p`
  font-size: 1.6rem;
`;

export const BackButton = styled.button`
  font-size: 1.2rem;
  padding: 8px 15px;
  border-radius: 20px;
  color: #fff;
  background-color: ${(props) => props.theme.pointColors.lightGreen};
`;
