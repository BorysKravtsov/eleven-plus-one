import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const FavoriteIconStyle = {
  width: "22px",
  height: "22px",
};

const StyledFavoriteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const FavoriteButton = ({ matchId }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!userId || !matchId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/favorites?userId=${userId}`);
        const isFav = response.data.favorites.some((fav) => fav.matchId === matchId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Ошибка при проверке избранного:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      checkFavorite();
    } else {
      setLoading(false);
    }
  }, [userId, matchId]);

  const handleFavoriteClick = async () => {
    if (status === "loading" || loading) return;
    if (!userId) {
      console.error("Пользователь не авторизован");
      return;
    }

    try {
      setLoading(true);
      if (isFavorite) {
        await axios.delete("/api/favorites", { data: { userId, matchId } });
      } else {
        await axios.patch("/api/favorites", { userId, matchId });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Ошибка при изменении избранного:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledFavoriteButton onClick={handleFavoriteClick} disabled={loading}>
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
