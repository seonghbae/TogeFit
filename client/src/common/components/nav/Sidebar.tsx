import { Link } from 'react-router-dom';
import { Dumbbell } from 'styled-icons/fa-solid';
import { SpoonKnife } from 'styled-icons/icomoon';
import { Article } from 'styled-icons/material-rounded';
import { Wrapper, NavLink } from './SidebarStyle';

interface SidebarProps {
  openSidebar: boolean;
}

const Sidebar = ({ openSidebar }: SidebarProps) => (
  <Wrapper openSidebar={openSidebar}>
    <NavLink>
      <Link to="/">
        <Article />
        전체 게시글
      </Link>
    </NavLink>
    <NavLink>
      <Link to="/">
        <Dumbbell />
        루틴 관리
      </Link>
    </NavLink>
    <NavLink>
      <Link to="/">
        <SpoonKnife />
        식단 관리
      </Link>
    </NavLink>
  </Wrapper>
);

export default Sidebar;
