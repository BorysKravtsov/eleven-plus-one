import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getMatchesByLeagueIds } from "../../utils/apiFootball";
const MatchesHeading = styled.h2`
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  margin-top: 10px;
`;
const LeagueNameContainer = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 0 13px;
  font-size: 14px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
`;

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

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
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

export default function MatchesList({ leagueIds }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatchesByLeagueIds(leagueIds);
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    };

    fetchMatches();
  }, [leagueIds]);

  const matchesByLeague = matches.reduce((acc, match) => {
    const leagueName = match.league.name;
    if (!acc[leagueName]) {
      acc[leagueName] = [];
    }
    acc[leagueName].push(match);
    return acc;
  }, {});

  return (
    <MatchesContainer>
      <MatchesHeading>Fixtures</MatchesHeading>
      <MatchesListContainer>
        {Object.entries(matchesByLeague).map(([leagueName, leagueMatches]) => (
          <li key={leagueName}>
            <LeagueNameContainer>
              <img
                src={leagueMatches[0].league.logo}
                alt={`${leagueName} logo`}
                width={16}
                height={16}
              />
              {leagueName} -{" "}
              {new Date(leagueMatches[0].fixture.date).toLocaleDateString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                }
              )}
            </LeagueNameContainer>
            <ul>
              {leagueMatches.map((match) => (
                <a href={`/match/${match.fixture.id}`} key={match.fixture.id}>
                  <MatchContainer>
                    <FavoriteButton>
                      <Image src="/notFavorite.svg" alt="favorite" width={22} height={22} />
                    </FavoriteButton>
                    <MatchTime>
                      {new Date(match.fixture.date).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </MatchTime>
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
                  </MatchContainer>
                  <StyledHr />
                </a>
              ))}
            </ul>
          </li>
        ))}
      </MatchesListContainer>
    </MatchesContainer>
  );
}
