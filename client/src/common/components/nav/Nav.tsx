import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavWrapper, NavBurger, Title, UserIcon } from './NavStyle';
import Sidebar from './Sidebar';

const Nav = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <NavWrapper>
      <NavBurger
        openSidebar={openSidebar}
        onClick={() => {
          setOpenSidebar((prev) => !prev);
        }}
      />
      <Sidebar openSidebar={openSidebar} />
      <Link to="/">
        <Title>HealthCare for you</Title>
      </Link>
      <Link to="/info">
        <UserIcon />
      </Link>
    </NavWrapper>
  );
};

export default Nav;
