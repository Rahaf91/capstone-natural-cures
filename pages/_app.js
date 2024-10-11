import GlobalStyle from "../styles";
import Fuse from "fuse.js";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  const {
    data: remedies,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/remedies", fetcher);

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !remedies) {
    return <h1>Error loading remedies: {error.message}</h1>;
  }
  const fuse = new Fuse(remedies, {
    keys: ["title", "ingredients"],
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
      item.ingredients.some((ingredient) => regex.test(ingredient))
    );
  }

  const results = searchQuery ? fuse.search(searchQuery) : [];

  const filteredRemedies = searchQuery
    ? results
        .map((result) => result.item)
        .filter((item) => matchesQueryAtWordStart(item, searchQuery))
    : remedies;

  function handleSearchQuery({ currentTarget = {} }) {
    const { value } = currentTarget;
    setSearchQuery(value);
  }

  async function handleAddRemedy(newRemedy) {
    const response = await fetch("/api/remedies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRemedy),
    });

    if (!response.ok) {
      throw new Error("Failed to add remedy");
    }
    mutate();
  }

  async function handleDeleteRemedy(id) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete remedy");
    }
    mutate();
  }

  async function handleEditRemedy(id, remedy) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(remedy),
    });

    if (!response.ok) {
      throw new Error("Failed to update the remedy.");
    }
    mutate();
  }

  async function handleToggleFavorite(id, isFavorite) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite: !isFavorite }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
    mutate();
  }

  async function handleAddNotes(id, note) {
    const response = await fetch(`/api/remedies/${id}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
    mutate();
  }

  async function handleEditNotes(id, noteId, updatedNote) {
    const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
    mutate();
  }

  async function handleDeleteNote(id, noteId) {
    const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note: " + response.status);
    }
    mutate();
  }
  return (
    <SWRConfig>
      <Layout>
        <GlobalStyle />
        <Component
          {...pageProps}
          remedies={filteredRemedies}
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
      </Layout>
    </SWRConfig>
  );
}
