import React from "react";
import { useSession } from "next-auth/react";

const FavoriteButton = ({ matchId }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const userId = session?.user?.id;

  const handleFavoriteClick = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch("/api/favorites", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, matchId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Updated favorites:", data.favorites);
      } else {
        console.error("Error updating favorites:", data.error);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  return <button onClick={handleFavoriteClick}>Add to Favorites</button>;
};

export default FavoriteButton;
