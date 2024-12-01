import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Header from "../../components/Header/Header";
import styled from "styled-components";
import MatchesList from '../../components/MatchItem/MatchItem';
import { fetchFavoriteIds } from '../../utils/api';

export const leagueIds = [140,39,61,135,78];

const MainContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Home() {
  const { data: session } = useSession();
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const getFavoriteIds = async () => {
      if (!session || !session.user) return;
      const favorites = await fetchFavoriteIds(session.user.id);
      setFavoriteIds(favorites);
    };

    getFavoriteIds();
  }, [session]);

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <MainContainer>
            <MatchesList
              leagueIds={leagueIds}
              favoriteIds={favoriteIds}
              setFavoriteIds={setFavoriteIds}
            />
          </MainContainer>
        </div>
      </main>
    </div>
  );
}
