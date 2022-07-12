import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  & > div {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5% 3% 5% 3%;
    border-radius: 20px;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  }
`;

export const RegisterLink = styled(Link)`
  margin-left: 1rem;
  font-size: 1.3rem;
  padding-bottom: 3px;
  border-bottom: 3px solid ${(props) => props.theme.pointColors.orange};
  color: ${(props) => props.theme.pointColors.green};
`;
