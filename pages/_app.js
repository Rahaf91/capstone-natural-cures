import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useState(initialRemedies);
  function handleDeleteRemedy(id) {
    setRemedies(remedies.filter((remedy) => remedy.id !== id));
  }
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        remedies={remedies}
        onDeleteRemedy={handleDeleteRemedy}
      />
    </>
  );
}
