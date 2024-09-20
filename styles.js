import { createGlobalStyle } from "styled-components";
import { Capriola } from "next/font/google";

const capriola = Capriola({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-capriola",
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  input::placeholder,
  textarea::placeholder {
    color: rgba(83, 89, 47, 0.5);
    font-size: 0.7rem;
  }

  body {
    margin: 0;
    font-family:${capriola.style.fontFamily}, system-ui;
    background-color: #eaded0;
  }


  :root {
  --background-color: #bec092;  
  --text-color:#53592F;  
  --card-background:#BEBF93;
  --font-capriola: sans-serif; 
  --font-capriola: ${capriola.style.fontFamily};
 --border-radius: 10rem;
 --box-shadow:0 0 0 3px rgba(133, 137, 94, 0.3);
--background-color-button: #85895E;
--color-button: #F6F9C7;
   h1 {

  color: var(--text-color);
}

h2 {

  color: var(--text-color);
  text-align:center;
}

h3 {
 
  color: var(--text-color);
  padding-left:1rem;

  
}
ul{
 
  color: var(--text-color);
}

p {
 
}

  }

  @media print {
    .no-print {
      display: none !important;
    }

    .Title {
      margin-bottom: 0;
    }
      .Subtitle {
      margin-bottom: 0;
    }

    .List {
      margin-top: 0;
    }

  }
`;
