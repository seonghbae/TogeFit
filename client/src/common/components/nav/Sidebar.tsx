import { Link } from 'react-router-dom';

// icon
import { Dumbbell } from 'styled-icons/fa-solid';
import { SpoonKnife } from 'styled-icons/icomoon';
import { Article } from 'styled-icons/material-rounded';
import { Logout } from 'styled-icons/material-twotone';

import * as SC from './SidebarStyle';

interface SidebarProps {
  openSidebar: boolean;
  handleClick(): void;
}

const Sidebar = ({ openSidebar, handleClick }: SidebarProps) => (
  <SC.Wrapper openSidebar={openSidebar}>
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
    <SC.NavLink>
      <Link to="/diet">
        <Logout />
        로그아웃
      </Link>
    </SC.NavLink>
  </SC.Wrapper>
);

export default Sidebar;
