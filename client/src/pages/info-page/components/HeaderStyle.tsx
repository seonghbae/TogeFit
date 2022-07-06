import styled from 'styled-components';

export const InfoHeader = styled.header`
  /* display: flex; */
  position: relative;
  /* justify-content: space-evenly; */
  /* align-items: center; */
  width: 70%;
  height: 300px;
  margin-top: 100px;
  /* border: 1px solid black; */
  border-radius: 4rem;
  background-color: #fff;
`;

export const ProfileImg = styled.img`
  position: absolute;
  width: 256px;
  height: 256px;
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
  li {
    display: inline-block;
    font-size: 1.8rem;
    padding-bottom: 0.4rem;

    + li {
      margin-left: 2rem;
    }
  }

  li:first-child {
    border-bottom: 5px solid ${(props) => props.theme.pointColors.orange};
  }

  span {
    padding: 0 1.8rem;
    font-size: 1.6rem;
  }
`;

export const JandiContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 60%;
`;
