import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle, theme } from 'styles';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
