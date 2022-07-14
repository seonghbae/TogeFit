import { getUserId } from 'common/utils/getUserId';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as SC from './NavStyle';
import Sidebar from './Sidebar';

const Nav = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const userId = getUserId();

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
      {userId ? (
        <Link to={`/info/exercise/${userId}`}>
          <SC.UserIcon />
        </Link>
      ) : (
        <Link to="/login">
          <SC.LoginButton>Sign in</SC.LoginButton>
        </Link>
      )}
    </SC.NavWrapper>
  );
};

export default Nav;
