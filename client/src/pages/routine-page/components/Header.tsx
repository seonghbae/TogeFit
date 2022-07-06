import { SearchForm } from '../../../common/components';
import { HeaderWrapper } from './HeaderStyle';

const Header = () => (
  <HeaderWrapper>
    <SearchForm />
    <button type="button">+</button>
  </HeaderWrapper>
);

export default Header;
