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

export const ListItem = styled.li``;

export const GoDetail = styled.button`
  display: block;
  margin-left: auto;
`;
