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
  h1, h2 {
    font-family: 'Lato Light';
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
  
  .chart {
    cursor: url("/assets/images/chart-cursor.svg"), pointer;
  }
  .MuiCircularProgress-colorPrimary {
    color: #739ba2 !important;
  }
  .MuiCircularProgress-root {
    left: 43%;
    position: absolute;
    top: 44vh;
  }
`;
