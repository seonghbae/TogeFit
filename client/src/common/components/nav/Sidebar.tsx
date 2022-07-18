import { Link } from 'react-router-dom';

// icon
import { Dumbbell } from 'styled-icons/fa-solid';
import { SpoonKnife } from 'styled-icons/icomoon';
import { Article } from 'styled-icons/material-rounded';
import { Logout } from 'styled-icons/material-twotone';
import useLogoutRequest from './hook/useLogoutRequest';

import * as SC from './SidebarStyle';

interface SidebarProps {
  isOpen: boolean;
  userId: string | undefined;
  handleClick(): void;
}

const Sidebar = ({ isOpen, userId, handleClick }: SidebarProps) => {
  const { requestLogout, error } = useLogoutRequest();

  const handleLogout = () => {
    handleClick();
    requestLogout();
  };

  return (
    <SC.Wrapper isOpen={isOpen}>
      <SC.NavLink>
        <Link to="/" onClick={handleClick}>
          <Article />
          전체 게시글
        </Link>
      </SC.NavLink>
      <SC.NavLink>
        <Link to="/routine" onClick={handleClick}>
          <Dumbbell />
          루틴 관리
        </Link>
      </SC.NavLink>
      <SC.NavLink>
        <Link to="/diet" onClick={handleClick}>
          <SpoonKnife />
          식단 관리
        </Link>
      </SC.NavLink>
      {userId && (
        <SC.NavLink>
          <button type="button" onClick={handleLogout}>
            <Logout />
            로그아웃
          </button>
        </SC.NavLink>
      )}
    </SC.Wrapper>
  );
};

export default Sidebar;
