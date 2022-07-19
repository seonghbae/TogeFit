import { BoardContainer, Header } from './components';

import * as SC from './MainPageStyle';

const InfoPage = () => (
  <SC.Wrapper>
    <SC.Main>
      <Header />
      <BoardContainer />
    </SC.Main>
    <SC.Info>개인정보 div</SC.Info>
  </SC.Wrapper>
);

export default InfoPage;
