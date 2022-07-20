import styled from 'styled-components';
import { UserCircle } from 'styled-icons/boxicons-solid';

export const UserInfo = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 20rem;
  margin: 10rem 0;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 1rem;
`;

export const UserProfile = styled.div`
  margin-top: 12rem;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 1rem 0;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  min-width: 80px;
  object-fit: cover;
`;
export const PrifileImgDiv = styled.div`
  overflow: hidden;
  top: 1rem;
  margin: 1rem 0;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.pointColors.beige};

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

export const UserIcon = styled(UserCircle)`
  width: 50%;
  height: 70%;
  color: ${(props) => props.theme.pointColors.orange};
`;

export const UserName = styled.span`
  font-size: 1.5rem;
  word-break: break-all;
  width: 8rem;
  text-align: center;
`;

export const PageLink = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  border-bottom: 3px solid #fff;

  :hover {
    border-bottom: 3px solid ${(props) => props.theme.pointColors.orange};
  }

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    padding-right: 10px;
  }
`;

export const LoginWrapper = styled.div`
  position: fixed;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 15%;
  height: 10%;
`;

export const LoginButton = styled.button`
  padding: 8px 20px;
  border: 1px solid ${(props) => props.theme.pointColors.orange};
  border-radius: 2rem;
  font-size: 1.2rem;
`;
