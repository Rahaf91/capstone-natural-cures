import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PersonalizedDataPage({ remedies }) {
  const [userData, setUserData] = useState(null);
  const [favoriteRemedies, setFavoriteRemedies] = useState([]);
  const [addedRemedies, setAddedRemedies] = useState([]);
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
    } else {
      // Benutzerdaten, Favoriten und hinzugefügte Heilmittel aus localStorage oder API abrufen
      const user = JSON.parse(localStorage.getItem("userData"));
      setUserData(user);

      const favRemedies = remedies.filter((remedy) => remedy.isFavorite);
      const userAddedRemedies = remedies.filter(
        (remedy) => remedy.addedBy === user.email
      );

      const userNotes = remedies
        .filter((remedy) => remedy.notes)
        .flatMap((remedy) =>
          remedy.notes.filter((note) => note.user === user.email)
        );

      setFavoriteRemedies(favRemedies);
      setAddedRemedies(userAddedRemedies);
      setNotes(userNotes);
    }
  }, [remedies]);

  return (
    <>
      {userData && (
        <main>
          <h1>Willkommen, {userData.name}</h1>
          <p>Email: {userData.email}</p>

          <h2>Deine favorisierten Heilmittel</h2>
          {favoriteRemedies.length > 0 ? (
            <ul>
              {favoriteRemedies.map((remedy) => (
                <li key={remedy.id}>{remedy.title}</li>
              ))}
            </ul>
          ) : (
            <p>Keine favorisierten Heilmittel vorhanden.</p>
          )}

          <h2>Deine hinzugefügten Heilmittel</h2>
          {addedRemedies.length > 0 ? (
            <ul>
              {addedRemedies.map((remedy) => (
                <li key={remedy.id}>{remedy.title}</li>
              ))}
            </ul>
          ) : (
            <p>Keine Heilmittel hinzugefügt.</p>
          )}

          <h2>Deine privaten Notizen</h2>
          {notes.length > 0 ? (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>{note.content}</li>
              ))}
            </ul>
          ) : (
            <p>Keine Notizen hinzugefügt.</p>
          )}
        </main>
      )}
    </>
  );
}
