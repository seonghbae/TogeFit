import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    pointColors: {
      black: string;
      green: string;
      orange: string;
      beige: string;
    };
  }
}
