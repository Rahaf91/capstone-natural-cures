import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Fuse from "fuse.js";
import { useState } from "react";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useLocalStorageState("_REMEDIES", {
    defaultValue: initialRemedies,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const fuse = new Fuse(remedies, {
    keys: ["title", "ingredients"],
    includeScore: true,
    threshold: 0,
    useExtendedSearch: true,
  });

  const results = searchQuery ? fuse.search(searchQuery) : [];
  const filteredRemedies = searchQuery
    ? results.map((result) => result.item)
    : null;

  function handleSearchQuery({ currentTarget = {} }) {
    const { value } = currentTarget;
    setSearchQuery(value);
  }

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

  function handleDeleteNote(remedyId, noteId) {
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === remedyId
          ? {
              ...remedy,
              notes: remedy.notes.filter((note) => note.id !== noteId),
            }
          : remedy
      )
    );
  }

  function handleEditNotes(remedyId, noteId, updatedNote) {
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === remedyId
          ? {
              ...remedy,
              notes: remedy.notes.map((note) =>
                note.id === noteId ? { ...note, ...updatedNote } : note
              ),
            }
          : remedy
      )
    );
  }

  useEffect(() => {
    setRemedies(initialRemedies);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        remedies={filteredRemedies ? filteredRemedies : remedies}
        handleAddRemedy={handleAddRemedy}
        handleDeleteRemedy={handleDeleteRemedy}
        handleEditRemedy={handleEditRemedy}
        handleToggleFavorite={handleToggleFavorite}
        handleAddNotes={handleAddNotes}
        handleSearchQuery={handleSearchQuery}
        searchQuery={searchQuery}
        handleEditNotes={handleEditNotes}
        handleDeleteNote={handleDeleteNote}
      />
    </>
  );
}
