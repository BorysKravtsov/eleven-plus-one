import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
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

const TeamLogo = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
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

const TeamName = styled.span`
  flex: 1;
  font-size: 13px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
`;

const StyledHr = styled.hr`
  border: 1px solid #f0f3bd;
  opacity: 0.1;
`;

const FavoriteMatches = ({ matchIds }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const promises = matchIds.map(id =>
          axios.get(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
            headers: {
              "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
              Accept: "application/json",
            },
          })
        );
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data.response[0]);
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    };

    if (matchIds.length > 0) {
      fetchMatches();
    }
  }, [matchIds]);

  return (
    <MatchesContainer>
      {matches.map((match) => (
        <>
        <MatchContainer key={match.fixture.id}>
            <FavoriteButton matchId={match.fixture.id} />
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
                <TeamLogo
                  src={match.teams.home.logo}
                  alt={`${match.teams.home.name} logo`}
                />
                <TeamName>{match.teams.home.name}</TeamName>
              </TeamContainer>
              <TeamContainer>
                <TeamLogo
                  src={match.teams.away.logo}
                  alt={`${match.teams.away.name} logo`}
                />
                <TeamName>{match.teams.away.name}</TeamName>
              </TeamContainer>
            </TeamsContainer>
        </Link>
          </MatchContainer>
          <StyledHr />
        </>
      ))}
    </MatchesContainer>
  );
};

export default FavoriteMatches;