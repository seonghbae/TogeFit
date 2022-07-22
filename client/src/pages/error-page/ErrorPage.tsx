import { Link } from 'react-router-dom';
import * as SC from './ErrorPageStyle';

const ErrorPage = () => (
  <SC.Wrapper>
    <div>
      <SC.Header>404 Not Found!</SC.Header>
      <SC.Content>이런 막다른 길에 도착했어요!</SC.Content>
      <Link to="/">
        <SC.BackButton>GO HOME</SC.BackButton>
      </Link>
    </div>
  </SC.Wrapper>
);

export default ErrorPage;
