import { Link } from 'react-router-dom';
import { NavWrapper, NavBurger, Title, UserIcon } from './NavStyle';

const Nav = () => (
  <NavWrapper>
    <NavBurger />
    <Link to="/">
      <Title>HealthCare for you</Title>
    </Link>
    <Link to="/info">
      <UserIcon />
    </Link>
  </NavWrapper>
);

export default Nav;
