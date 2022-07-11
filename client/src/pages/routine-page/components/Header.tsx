import { SearchForm } from '../../../common/components';
import * as SC from './HeaderStyle';

const Header = () => (
  <SC.HeaderWrapper>
    <SearchForm />
    <button type="button">+</button>
  </SC.HeaderWrapper>
);

export default Header;
