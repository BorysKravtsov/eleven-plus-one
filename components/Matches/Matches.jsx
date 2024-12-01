import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Round = styled.h3`
  font-size: 18px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
  margin-top: 10px;
`;

const MatchesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #17111d;
  padding: 0 30px;
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

const Score = styled.div`
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

const Matches = ({ favoriteIds, fetchFavorites, matchesByRound, reverseOrder = false }) => {
  const sortedRounds = Object.entries(matchesByRound).sort(([a], [b]) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return reverseOrder ? numB - numA : numA - numB;
  });

  return (
    <MatchesContainer>
      <MatchesListContainer>
        {sortedRounds.map(([round, matches]) => {
          const roundNumber = round.match(/\d+/)[0];
          return (
            <li key={round}>
              <Round>Round {roundNumber}</Round>
              <ul>
                {matches.map((match) => (
                  <>
                  <MatchContainer>
                      <FavoriteButton favoriteIds={favoriteIds} fetchFavorites={fetchFavorites} />
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
                      <Score>
                        {match.fixture.status.short === "FT"
                          ? `${match.goals.home} - ${match.goals.away}`
                          : "-"}
                      </Score>
                    </MatchContainer>
                    <StyledHr />
                    </>
                ))}
              </ul>
            </li>
          );
        })}
      </MatchesListContainer>
    </MatchesContainer>
  );
};

export default Matches;
