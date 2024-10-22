import GlobalStyle from "../styles";
import Fuse from "fuse.js";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { SessionProvider } from "next-auth/react";

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
    error: remediesError,
    isLoading: remediesLoading,
    mutate: mutateRemedies,
  } = useSWR("/api/remedies", fetcher);

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    mutate: mutateUser,
  } = useSWR("/api/user", fetcher);

  const [searchQuery, setSearchQuery] = useState("");

  if (remediesLoading || userLoading) {
    return <h1>Loading...</h1>;
  }

  if (remediesError || userError || !remedies || !user) {
    return (
      <h1>
        Error loading data: {remediesError?.message || userError?.message}
      </h1>
    );
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
    mutateRemedies();
  }

  async function handleDeleteRemedy(id) {
    const response = await fetch(`/api/remedies/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete remedy");
    }
    mutateRemedies();
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

    mutateRemedies();
  }

  async function handleToggleFavorite(id, isFavorite) {
    // const response = await fetch(`/api/remedies/${id}`, {

    const response = await fetch(`/api/user/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ remedyId: id, isFavorite: !isFavorite }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
    mutateUser();
  }

  async function handleAddNotes(id, note) {
    // const response = await fetch(`/api/remedies/${id}/notes`, {

    const response = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ remedyId: id, note }),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
    mutateUser();
  }

  async function handleEditNotes(id, noteId, updatedNote) {
    // const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ remedyId: id, noteId, updatedNote }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
    mutateUser();
  }

  async function handleDeleteNote(id, noteId) {
    // const response = await fetch(`/api/remedies/${id}/notes/${noteId}`, {
    const response = await fetch(`/api/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ remedyId: id, noteId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete note: " + response.status);
    }
    mutateUser();
  }

  async function handleAddReview(id, rating, comment) {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ remedyId: id, rating, comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to add review");
    }
    mutateUser();
  }

  return (
    <SessionProvider>
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
            handleAddReview={handleAddReview}
          />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
