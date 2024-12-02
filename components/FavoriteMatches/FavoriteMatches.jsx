import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import axios from "axios";
import Image from "next/image";

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const MatchesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #17111d;
  padding: 10px 30px;
  border-radius: 6px;
`;

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #251a2e;
  }
`;

const MatchTime = styled.span`
  width: 50px;
  text-align: center;
  margin-right: 10px;
  font-size: 13px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TeamLogo = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const TeamName = styled.span`
  flex: 1;
  font-size: 13px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
`;

const Score = styled.span`
  margin-left: auto;
  margin-right: 10px;
  font-family: "Figtree", sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const StyledHr = styled.hr`
  border: 1px solid #f0f3bd;
  opacity: 0.1;
`;

const NoFavoritesMessage = styled.div`
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
`;

const TeamLogoStyle = {
  width: "16px",
  height: "16px",
};

const FavoriteMatches = ({ matchIds = [] }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const promises = matchIds.map((matchId) =>
          axios.get(`https://v3.football.api-sports.io/fixtures?id=${matchId}`, {
            headers: {
              "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
              Accept: "application/json",
            },
          })
        );
        const results = await Promise.all(promises);
        const fetchedMatches = results.map((result) => result.data.response[0]);
        setMatches(fetchedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    if (matchIds.length > 0) {
      fetchMatches();
    }
  }, [matchIds]);

  return (
    <MatchesContainer>
      {matches.length === 0 ? (
        <NoFavoritesMessage>No favorite matches available.</NoFavoritesMessage>
      ) : (
        <MatchesListContainer>
          <h1>Favorite Matches</h1>
          {matches.map((match) => (
            <React.Fragment key={match.fixture.id}>
              <MatchContainer key={match.fixture.id}>
                <FavoriteButton matchId={match.fixture.id} key={`fav-${match.fixture.id}`} />
                <MatchTime>
                  {new Date(match.fixture.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </MatchTime>
                <Link href={`/match/${match.fixture.id}`} key={match.fixture.id}>
                  <TeamsContainer>
                    <TeamContainer>
                      <Image
                        src={match.teams.home.logo}
                        alt={`${match.teams.home.name} logo`}
                        width={16}
                        height={16}
                        style={TeamLogoStyle}
                      />
                      <TeamName>{match.teams.home.name}</TeamName>
                    </TeamContainer>
                    <TeamContainer>
                      <Image
                        src={match.teams.away.logo}
                        alt={`${match.teams.away.name} logo`}
                        width={16}
                        height={16}
                        style={TeamLogoStyle}
                      />
                      <TeamName>{match.teams.away.name}</TeamName>
                    </TeamContainer>
                  </TeamsContainer>
                </Link>
                <Score>
                  {match.fixture.status.short === "FT"
                    ? `${match.goals.home} - ${match.goals.away}`
                    : "-"}
                </Score>
              </MatchContainer>
              <StyledHr />
            </React.Fragment>
          ))}
        </MatchesListContainer>
      )}
    </MatchesContainer>
  );
};

export default FavoriteMatches;
