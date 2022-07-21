import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  justify-content: center;
  align-items: center;
`;

export const Date = styled.span`
  font-size: 1.2rem;
  padding-bottom: 5px;
  border-bottom: 5px solid ${(props) => props.theme.pointColors.orange};
`;

export const ListContainer = styled.ol`
  > * {
    font-size: 1.1rem;
  }

  > li + li {
    margin-top: 1rem;
  }
`;

export const GoDetail = styled.button`
  display: block;
  margin-left: auto;
  padding: 8px 13px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.pointColors.orange};
  color: #fff;
  font-size: 1.2rem;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;

  :hover {
    opacity: 1;
  }
`;
