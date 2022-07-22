import { BoardContainer, Header, UserInfo } from './components';

import * as SC from './MainPageStyle';

const InfoPage = () => (
  <SC.Wrapper>
    <SC.Main>
      <Header />
      <BoardContainer />
    </SC.Main>
    <SC.Info>
      <UserInfo />
    </SC.Info>
  </SC.Wrapper>
);

export default InfoPage;
