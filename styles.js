import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }

  @media print {
    .no-print {
      display: none !important;
    }
    h2 {
      margin-bottom: 0;
    }
    ul {
      margin-top: 0;
    }
  }
`;
