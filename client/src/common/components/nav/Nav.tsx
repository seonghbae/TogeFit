import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as SC from './NavStyle';
import Sidebar from './Sidebar';

const Nav = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <SC.NavWrapper>
      <SC.NavBurger
        openSidebar={openSidebar}
        onClick={() => {
          setOpenSidebar((prev) => !prev);
        }}
      />
      <Sidebar openSidebar={openSidebar} />
      <Link to="/">
        <SC.Title>HealthCare for you</SC.Title>
      </Link>
      <Link to="/info">
        <SC.UserIcon />
      </Link>
    </SC.NavWrapper>
  );
};

export default Nav;
