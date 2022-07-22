import { getUserId } from 'common/utils/getUserId';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as SC from './NavStyle';
import Sidebar from './Sidebar';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    setUserId(getUserId());
  }, [location]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const infoBtn = () =>
    userId ? (
      <Link to={`/info/exercise/${userId}`}>
        <SC.UserIcon />
      </Link>
    ) : (
      <Link to="/login">
        <SC.LoginButton>Sign in</SC.LoginButton>
      </Link>
    );

  return (
    <SC.NavWrapper>
      {location.pathname !== '/' ? (
        <SC.NavBurger isOpen={isOpen} onClick={handleClick} />
      ) : null}
      {location.pathname !== '/' ? (
        <Sidebar isOpen={isOpen} userId={userId} handleClick={handleClick} />
      ) : null}
      <Link to="/">
        <SC.Title>
          <SC.TitleImg
            src="https://team-16-s3.s3.ap-northeast-2.amazonaws.com/run.png"
            alt="runner"
          />
          TogeFit
        </SC.Title>
      </Link>
      {location.pathname === '/' ? null : infoBtn()}
    </SC.NavWrapper>
  );
};

export default Nav;
