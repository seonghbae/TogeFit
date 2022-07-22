import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;

  & > div {
    background-color: #fff;
    min-width: 35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5% 3% 5% 3%;
    border-radius: 20px;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  }
`;
