import GlobalStyle from "../styles";
import Fuse from "fuse.js";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR, { mutate } from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({ Component, pageProps }) {
  const { data: remedies, error, isLoading } = useSWR("/api/remedies", fetcher);

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading || !remedies) {
    return <h1>Loading...</h1>;
  }

  if (error) {
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
    mutate("/api/remedies");
  }

  async function handleDeleteRemedy(id) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "DELETE",
    });

    mutate(
      "/api/remedies",
      remedies.filter((remedy) => remedy.id !== id)
    );
    if (!response.ok) {
      throw new Error("Failed to delete remedy");
    }
  }

  async function handleEditRemedy(id, remedy) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(remedy),
    });
    mutate("/api/remedies");
    if (!response.ok) {
      throw new Error("Failed to update the remedy.");
    }
  }

  async function handleToggleFavorite(id, isFavorite) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite: !isFavorite }),
    });
    mutate("/api/remedies", (remedies) =>
      remedies.map((remedy) =>
        remedy._id === id ? { ...remedy, isFavorite: !isFavorite } : remedy
      )
    );
    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
  }

  async function handleAddNotes(id, note, noteId) {
    const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    mutate("/api/remedies", (remedies) =>
      remedies.map((remedy) =>
        remedy._id === id
          ? {
              notes: [
                {
                  id: noteId,
                  ...note,
                },
                ...(remedy.notes || []),
              ],
              ...remedy,
            }
          : remedy
      )
    );

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
  }

  async function handleEditNotes(id, noteId, updatedNote) {
    const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    mutate("/api/remedies", (remedies) =>
      remedies.map((remedy) =>
        remedy._id === id
          ? {
              ...remedy,
              notes: remedy.notes.map((note) =>
                note.id === noteId ? { ...note, ...updatedNote } : note
              ),
            }
          : remedy
      )
    );
    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
  }

  async function handleDeleteNote(id, noteId) {
    const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
      method: "DELETE",
    });
    mutate("/api/remedies", (remedies) =>
      remedies.map((remedy) =>
        remedy._id === id
          ? {
              ...remedy,
              notes: remedy.notes.filter((note) => note.id !== noteId),
            }
          : remedy
      )
    );
    if (!response.ok) {
      throw new Error("Failed to delete note: " + response.status);
    }
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
