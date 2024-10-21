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
    
    color: #54582f;
    font-style: italic; 
    font-size: 0.9rem;
  
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
 --border-radius: 1rem;
 --box-shadow:2px 2px 9px  rgba(0, 0, 0, 0.9);
--background-color-button: #85895E;
--color-button: #F6F9C7;
 --header-bg-color: #eaded0;
  --header-text-color: #173a27;
  --header-card-box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.2); 
   --border-color: #85895E;
  --padding: 0.5rem;  
   --width: 20rem;
   --height:5.6vh;
   h1 {
   text-align:center;
  color: var(--text-color);font-size: 1.6rem;
}

h2 {

  font-size: 1.4rem;
    color: var(--text-color);
    font-family: var(--font-capriola);text-align: center;
}

h3 {
 
  font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-family: var(--font-capriola);
  padding-left:1rem;

  
}
ul{
 
  font-size: 1rem;
    padding-left: 1.5rem;
    color: var(--text-color);
    font-family: var(--font-capriola);
}
@media (max-width: 600px) {
  h1 {

font-size: 1.3rem;
margin-top:2rem;
}
    h2 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1rem;
    }

    ul {
      font-size: 0.85rem;
    }
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
