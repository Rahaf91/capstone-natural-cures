import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useState(initialRemedies);

  function handleAddRemedy(newRemedy) {
    setRemedy([
      {
        id: uid(),
        ...newRemedy,
      },
      ...remedies,
    ]);
  }
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} remedies={remedies} />
    </>
  );
}
