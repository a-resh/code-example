import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Lato, serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
    margin: 0;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .calculator-input-number {
    width: 100px;
    height: 20px;
    margin: 0 5px;
    font-size: 15px;
  }
  
  .calculator-select-place {
    height: 20px;
    margin: 0 5px;
    font-size: 15px;
  }
`;
