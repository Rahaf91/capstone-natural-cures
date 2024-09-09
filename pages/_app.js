import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useLocalStorageState("_REMEDIES", {
    defaultValue: initialRemedies,
  });

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

  function handleEditRemedy(id, updatedRemedy) {
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === id ? { ...remedy, ...updatedRemedy } : remedy
      )
    );
  }

  function handleToggleFavorite(id) {
    const updatedRemedies = remedies.map((remedy) =>
      remedy.id === id ? { ...remedy, isFavorite: !remedy.isFavorite } : remedy
    );

    setRemedies(updatedRemedies);
  }

  function handleAddNotes(remedyId, note) {
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === remedyId
          ? {
              ...remedy,
              notes: [{ id: uid(), ...note }, ...(remedy.notes || [])],
            }
          : remedy
      )
    );
  }
  function handleSearch(query) {
    setRemedies(
      initialRemedies.filter((remedy) => {
        const title = remedy.title.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return (
          title.includes(lowerCaseQuery) || title.startsWith(lowerCaseQuery)
        );
      })
    );
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        remedies={remedies}
        handleAddRemedy={handleAddRemedy}
        handleDeleteRemedy={handleDeleteRemedy}
        handleEditRemedy={handleEditRemedy}
        handleToggleFavorite={handleToggleFavorite}
        handleAddNotes={handleAddNotes}
        handleSearch={handleSearch}
      />
    </>
  );
}
