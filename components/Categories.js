import styled from "styled-components";
import { useEffect, useState } from "react";
import remediesData from "../assets/remedies.json";

export default function Categories({ handleCategoryChange, showIcons }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = [
        ...new Set(remediesData.map((remedy) => remedy.category.toLowerCase())),
      ];
      setCategories(
        categories.map((category) => ({
          name: category,
          icon: `/navigation-icons/${category}.svg`,
        }))
      );
    }
    fetchCategories();
  }, []);

  return (
    <>
      {showIcons && (
        <IconContainer>
          {categories.map((category) => (
            <IconWrapper key={category.name} onClick={handleCategoryChange}>
              <IconImage src={category.icon} alt={category.name} />
              <IconLabel>{category.name}</IconLabel>
            </IconWrapper>
          ))}
        </IconContainer>
      )}
    </>
  );
}

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.2rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 90px;
  height: 90px;
`;

const IconLabel = styled.span`
  font-size: 0.7rem;
`;
/*import GlobalStyle from "../styles";
import initialRemedies from "../assets/remedies.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Fuse from "fuse.js";
import { useState } from "react";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTopButton";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useLocalStorageState("_REMEDIES", {
    defaultValue: initialRemedies,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const fuse = new Fuse(remedies, {
    keys: ["title", "ingredients", "usage", "symptoms"],
    includeScore: true,
    threshold: 0,
    useExtendedSearch: true,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    shouldSort: true,
  });

  function matchesQueryAtWordStart(item, query) {
    const regex = new RegExp(`\\b${query}`, "i");
    return (
      regex.test(item.title) ||
      item.ingredients.some((ingredient) => regex.test(ingredient)) ||
      regex.test(item.usage) ||
      item.symptoms.some((symptom) => regex.test(symptom))
    );
  }

  const results = searchQuery ? fuse.search(searchQuery) : [];

  const filteredRemedies = searchQuery
    ? results
        .map((result) => result.item)
        .filter((item) => matchesQueryAtWordStart(item, searchQuery))
    : null;

  function handleSearchQuery(value) {
    setSearchQuery(value);
  }

  const [selectedCategory, setSelectedCategory] = useState("");

  const allSymptoms = Array.from(
    new Set(initialRemedies.flatMap((remedy) => remedy.symptoms))
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState(allSymptoms);
  const categoryRemedies = remedies.filter(
    (remedy) =>
      remedy.category.toLowerCase() === selectedCategory.toLowerCase() &&
      selectedSymptoms.some((symptom) => remedy.symptoms.includes(symptom))
  );
  function handleCategoryChange(value) {
    setSelectedCategory(value);
  }

  function handleSymptomChange(value) {
    const selectedSymptoms =
      value !== "all"
        ? [value]
        : Array.from(
            new Set(initialRemedies.flatMap((remedy) => remedy.symptoms))
          );
    setSelectedSymptoms(selectedSymptoms);
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
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === id
          ? { ...remedy, isFavorite: !remedy.isFavorite }
          : remedy
      )
    );
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

  return (
    <Layout>
      <GlobalStyle />
      <ScrollToTop />
      <Component
        {...pageProps}
        remedies={filteredRemedies ? filteredRemedies : remedies}
        handleAddRemedy={handleAddRemedy}
        handleDeleteRemedy={handleDeleteRemedy}
        handleEditRemedy={handleEditRemedy}
        handleToggleFavorite={handleToggleFavorite}
        handleAddNotes={handleAddNotes}
        handleSearchQuery={handleSearchQuery}
        handleCategoryChange={handleCategoryChange}
        handleSymptomChange={handleSymptomChange}
        searchQuery={searchQuery}
        handleEditNotes={handleEditNotes}
        handleDeleteNote={handleDeleteNote}
        selectedCategory={selectedCategory}
        selectedSymptoms={selectedSymptoms}
      />
    </Layout>
  );
}
*/
