import styled, { css } from 'styled-components';

interface LiProps {
  active: boolean;
}

export const InfoHeader = styled.header`
  position: relative;
  width: 70%;
  height: 350px;
  margin-top: 100px;
  margin-bottom: 50px;
  border-radius: 4rem;
  background-color: #fff;
`;

export const ProfileImg = styled.img`
  position: absolute;
  width: 19%;
  min-width: 150px;
  height: auto;
  margin: 10px;
  top: -26%;
  left: 9%;
  background-color: ${(props) => props.theme.pointColors.beige};
  border: 1rem solid ${(props) => props.theme.pointColors.beige};
  border-radius: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  margin: 0 5rem 0 auto;
  justify-content: center;
  flex-direction: column;
`;

export const NameNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const UserName = styled.span`
  font-size: 2rem;
`;

export const Nav = styled.nav`
  a + a {
    margin-left: 1.5rem;
  }

  span {
    padding: 0 1.8rem;
    font-size: 1.6rem;
  }
`;

export const Li = styled.li<LiProps>`
  display: inline-block;
  font-size: 1.8rem;
  padding: 0 0.3rem;
  padding-bottom: 0.4rem;
  border-bottom: 5px solid #fff;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 5px solid ${props.theme.pointColors.orange};
    `}
`;

export const JandiContainer = styled.div`
  width: 100%;
  height: 60%;
`;
