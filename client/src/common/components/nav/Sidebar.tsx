import { Link } from 'react-router-dom';

// icon
import { Dumbbell } from 'styled-icons/fa-solid';
import { SpoonKnife } from 'styled-icons/icomoon';
import { Article } from 'styled-icons/material-rounded';

import * as SC from './SidebarStyle';

interface SidebarProps {
  openSidebar: boolean;
}

const Sidebar = ({ openSidebar }: SidebarProps) => (
  <SC.Wrapper openSidebar={openSidebar}>
    <SC.NavLink>
      <Link to="/">
        <Article />
        전체 게시글
      </Link>
    </SC.NavLink>
    <SC.NavLink>
      <Link to="/routine">
        <Dumbbell />
        루틴 관리
      </Link>
    </SC.NavLink>
    <SC.NavLink>
      <Link to="/diet">
        <SpoonKnife />
        식단 관리
      </Link>
    </SC.NavLink>
  </SC.Wrapper>
);

export default Sidebar;
