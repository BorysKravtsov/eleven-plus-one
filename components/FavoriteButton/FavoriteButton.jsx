import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const StyledFavoriteButton = styled.button``;

const FavoriteButton = ({ matchId }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("Initial isFavorite:", isFavorite);
  }, [userId, matchId]);

  const handleFavoriteClick = async () => {
    if (status === "loading") {
      console.log("Loading session...");
      return;
    }

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
      console.log("Updated isFavorite:", !isFavorite);
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
      />
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
