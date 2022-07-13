import { useEffect } from 'react';
import * as SC from './style';

interface LoadingProps {
  dotColor?: string;
  dotSize?: string;
}

const Loading = ({ dotColor, dotSize }: LoadingProps) => (
  <SC.Wrapper>
    <SC.LoadingBar>
      <SC.Dot bgColor={dotColor} dotSize={dotSize} />
      <SC.Dot bgColor={dotColor} dotSize={dotSize} />
      <SC.Dot bgColor={dotColor} dotSize={dotSize} />
    </SC.LoadingBar>
  </SC.Wrapper>
);

Loading.defaultProps = {
  dotColor: '#fff',
  dotSize: '30px',
};

export default Loading;
