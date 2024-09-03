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


  :root {
  --background-color: #f8fbca;  
  --text-color:#53592F;  
  --card-background:#BEBF93;
  --font-capriola: sans-serif; 
  --font-adventPro: serif; 
  --font-h1: var(--font-capriola);
  --font-h2: var(--font-adventPro);       
   --font-h3: var(--font-capriola);
   --font-p:var(--font-adventPro)
   --border-radius: 0.9rem;
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

/*button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--button-color);
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color:#85895E; /
button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.delete-button {
  background-color: var(--danger-color);
}

.delete-button:hover {
  background-color: #fa5252; } */
