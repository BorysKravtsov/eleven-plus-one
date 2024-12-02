import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import FavoriteMatches from "../../../components/FavoriteMatches/FavoriteMatches";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Favorites() {
  const [matchIds, setMatchIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/api/favorites?userId=${userId}`);
        console.log({response});
        const matchIds = response.data.favorites.map(fav => fav.matchId);
        setMatchIds(matchIds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite matches:", error);
      }
    };

    fetchFavorites();
  }, [userId]);


  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="container">
        <FavoriteMatches matchIds={matchIds} />
      </div>
    </>
  );
}
