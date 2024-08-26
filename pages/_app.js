import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useState(initialRemedies);

  function handleAddRemedy(newRemedy) {
    setRemedies([
      {
        id: uid(),
        ...newRemedy,
      },
      ...remedies,
    ]);
  }
  function handleDeleteRemedy(id) {
    setRemedies(remedies.filter((remedy) => remedy.id !== id));
  }

  function handleToggleFavorite(id) {
    const remedy = remedies.find((remedy) => remedy.id === id);

    if (!remedy) {
      return;
    } else {
      setRemedies(
        remedies.map((remedy) => {
          return remedy.id === id
            ? { ...remedy, isFavorite: !remedy.isFavorite }
            : remedy;
        })
      );
    }
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        remedies={remedies}
        handleAddRemedy={handleAddRemedy}
        handleDeleteRemedy={handleDeleteRemedy}
        handleToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
