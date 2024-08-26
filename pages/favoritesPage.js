import RemedyDetailsPage from "./remedy/[id]";

export default function FavoritePage({ onToggleFavorite, remedies }) {
  const favoriteIds = remedies.reduce((ids, remedy) => {
    if (remedy.isFavorite) {
      ids.push(remedy.id);
    }
    return ids;
  }, []);

  // Filter remedies to include only favorites
  const favoriteRemedies = remedies.filter((remedy) =>
    favoriteIds.includes(remedy.id)
  );

  return (
    <RemedyDetailsPage
      remedies={favoriteRemedies}
      onToggleFavorite={onToggleFavorite}
    />
  );
}
