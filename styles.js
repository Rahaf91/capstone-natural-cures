import { createGlobalStyle } from "styled-components";
import { css } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: #f8fbca;
    
  }


  :root {
  --background-color: #bec092;  
  --text-color:#53592F;  
  --card-background:#BEBF93;
  --font-capriola: sans-serif; 
  --font-adventPro: serif; 
  --font-h1: var(--font-capriola);
  --font-h2: var(--font-adventPro);       
   --font-h3: var(--font-capriola);
   --font-p:var(--font-adventPro)
   --border-radius: 10rem;
 --box-shadow:0 0 0 3px rgba(133, 137, 94, 0.3);
--background-color-button: #85895E;
--color-button: #F6F9C7;


   h1 {
  font-family: var(--font-h1);
  color: var(--text-color);
}

h2 {
  font-family: var(--font-h2);
  color: var(--text-color);
  text-align:center;
}

h3 {
  font-family: var(--font-h3);
  color: var(--text-color);
  padding-left:1rem;

  
}
ul{
  font-family: var(--font-p);
  color: var(--text-color);
}

p {
  font-family: var(--font-p);
}

  }
`;

export const BaseStyle = css`
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
