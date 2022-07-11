import { SearchForm } from '../../../common/components';
import * as SC from './HeaderStyle';

const Header = () => (
  <SC.HeaderWrapper>
    <h1>내 루틴 만들기</h1>
    <SearchForm />
    <button type="button">+</button>
  </SC.HeaderWrapper>
);

export default Header;
