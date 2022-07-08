import styled from 'styled-components';
import { Navigation } from 'styled-icons/fluentui-system-filled';
import { UserCircle } from 'styled-icons/boxicons-solid';

export const NavWrapper = styled.nav`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

export const NavBurger = styled(Navigation)`
  width: 60px;
  height: 60px;
  color: ${(props) => props.theme.pointColors.orange};
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
`;

export const UserIcon = styled(UserCircle)`
  width: 60px;
  height: 60px;
  color: ${(props) => props.theme.pointColors.orange};
`;
