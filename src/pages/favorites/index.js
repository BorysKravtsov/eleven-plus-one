import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Matches from "../../../components/Matches/Matches";
import axios from "axios";

export default function Favorites() {
  const [view, setView] = useState("futureMatches");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites");
        setMatches(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite matches:", error);
      }
    };

    fetchFavorites();
  }, []);

  const pastMatches = matches.filter(match => new Date(match.fixture.date) < new Date());
  const futureMatches = matches.filter(match => new Date(match.fixture.date) >= new Date());

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="container">
        <div>
          <button onClick={() => setView("pastMatches")}>Past Matches</button>
          <button onClick={() => setView("futureMatches")}>Future Matches</button>
        </div>
        {view === "pastMatches" && <Matches matchesByRound={pastMatches} />}
        {view === "futureMatches" && <Matches matchesByRound={futureMatches} />}
      </div>
    </>
  );
}
