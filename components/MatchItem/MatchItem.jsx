import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMatchesByLeagueIds } from '../../utils/apiFootball';

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const MatchTime = styled.span`
  width: 50px;
  text-align: center;
  margin-right: 10px;
`;

const TeamName = styled.span`
  flex: 1;
`;

export default function MatchesList({ leagueIds }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatchesByLeagueIds(leagueIds);
        setMatches(data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
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
    <div className="container">
      <h2>Matches</h2>
      <ul>
        {Object.entries(matchesByLeague).map(([leagueName, leagueMatches]) => (
          <li key={leagueName}>
            <h3>
              <img src={leagueMatches[0].league.logo} alt={`${leagueName} logo`} width={20} height={20} />
              {leagueName} -{" "}
              {new Date(leagueMatches[0].fixture.date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
              })}
            </h3>
            <ul>
              {leagueMatches.map((match) => (
                <a href={`/match/${match.fixture.id}`} key={match.fixture.id}>
                  <MatchContainer>
                    <MatchTime>
                      {new Date(match.fixture.date).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </MatchTime>
                    <TeamLogo src={match.teams.home.logo} alt={`${match.teams.home.name} logo`} />
                    <TeamName>{match.teams.home.name}</TeamName>
                    <span>-</span>
                    <TeamLogo src={match.teams.away.logo} alt={`${match.teams.away.name} logo`} />
                    <TeamName>{match.teams.away.name}</TeamName>
                  </MatchContainer>
                </a>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
