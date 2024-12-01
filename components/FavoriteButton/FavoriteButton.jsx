import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const ButtonContainer = styled.div`
  cursor: pointer;
`;

const FavoriteButton = ({ matchId, favoriteIds = [], setFavoriteIds }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = session?.user?.id?.toString();

  useEffect(() => {
    if (userId && Array.isArray(favoriteIds)) {
      const isMatchFavorite = favoriteIds.includes(matchId);
      setIsFavorite(isMatchFavorite);
    }
  }, [favoriteIds, matchId, userId]);

  const handleFavoriteToggle = async () => {
    if (!userId || !Array.isArray(favoriteIds)) return;

    try {
      const updatedFavorites = [...favoriteIds];
      const matchIndex = updatedFavorites.indexOf(matchId);

      if (matchIndex === -1) {
        updatedFavorites.push(matchId);
        await axios.patch("/api/favorites", { userId, matchId });
      } else {
        updatedFavorites.splice(matchIndex, 1);
        await axios.delete("/api/favorites", { data: { userId, matchId } });
      }

      if (typeof setFavoriteIds === "function") {
        setFavoriteIds(updatedFavorites);
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorite status for match", matchId, error);
    }
  };

  return (
    <ButtonContainer onClick={handleFavoriteToggle}>
      <Image
        src={isFavorite ? "/favorite.svg" : "/notFavorite.svg"}
        alt="Favorite Icon"
        width={30}
        height={30}
      />
    </ButtonContainer>
  );
};

export default FavoriteButton;
