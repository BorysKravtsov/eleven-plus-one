import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import FavoriteMatches from "../../../components/FavoriteMatches/FavoriteMatches";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Favorites() {
  const { data: session } = useSession();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!session) return;
    try {
      const response = await axios.get("/api/favorites", {
        params: { userId: session.user.id },
      });
      setFavoriteIds(response.data.favorites);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite matches:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="container">
        <FavoriteMatches matchIds={favoriteIds} />
      </div>
    </>
  );
}