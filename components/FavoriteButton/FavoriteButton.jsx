import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const StyledFavoriteButton = styled.button``;

const FavoriteIconStyle = {
  width: "22px",
  height: "22px",
};

const FavoriteButton = ({ matchId }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!userId || !matchId) return;
      try {
        const response = await axios.get(`/api/favorites?userId=${userId}`);
        const isFav = response.data.favorites.some(fav => fav.matchId === matchId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error checking favorite", error);
      }
    };

    checkFavorite();
  }, [userId, matchId]);

  const handleFavoriteClick = async () => {
    if (status === "loading") return;
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete("/api/favorites", { data: { userId, matchId } });
      } else {
        await axios.patch("/api/favorites", { userId, matchId });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite", error);
    }
  };

  return (
    <StyledFavoriteButton onClick={handleFavoriteClick}>
      <Image
        src={isFavorite ? "/favorite.svg" : "/notFavorite.svg"}
        alt="favorite"
        width={22}
        height={22}
        style={FavoriteIconStyle}
      />
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
