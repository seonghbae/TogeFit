import { useEffect } from 'react';
import * as SC from './style';

interface LoadingProps {
  dotColor?: string;
  dotSize?: string;
}

const Loading = ({ dotColor, dotSize }: LoadingProps) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <SC.Wrapper>
      <SC.LoadingBar>
        <SC.Dot bgColor={dotColor} dotSize={dotSize} />
        <SC.Dot bgColor={dotColor} dotSize={dotSize} />
        <SC.Dot bgColor={dotColor} dotSize={dotSize} />
      </SC.LoadingBar>
    </SC.Wrapper>
  );
};

Loading.defaultProps = {
  dotColor: '#fff',
  dotSize: '30px',
};

export default Loading;
