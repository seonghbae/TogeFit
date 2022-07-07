import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  & > button {
    margin-right: 1rem;
    border: 1px solid;
    width: 3rem;
    height: 3rem;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { HeaderWrapper };
