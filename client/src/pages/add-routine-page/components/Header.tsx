import { SearchForm } from '../../../common/components';
import { HeaderWrapper } from './HeaderStyle';

const Header = () => (
  <HeaderWrapper>
    <h1>내 루틴 만들기</h1>
    <SearchForm />
    <button type="button">+</button>
  </HeaderWrapper>
);

export default Header;
