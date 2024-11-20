import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const StatisticsContainer = styled.div`
  margin: 0 auto;
  font-family: "Figtree", sans-serif;
  font-size: 16px;
  max-width: 500px;
`;

const StatisticItem = styled.div`
  margin: 10px 0;
`;

const TeamStatistics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
`;

const StyledStatName = styled.span`
  font-weight: bold;
`;

const ProgressBarContainer = styled.div`
  background-color: #251a2e;
  border-radius: 5px;
  overflow: hidden;
  height: 10px;
  margin-top: 5px;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #028090;
  width: ${({ percentage }) => percentage}%;
`;

const FootballStatistics = ({ fixtureId }) => {
  const [homeStatistics, setHomeStatistics] = useState([]);
  const [awayStatistics, setAwayStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
          {
            headers: {
              "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
              Accept: "application/json",
            },
          }
        );

        const stats = response.data.response;
        if (stats && stats.length > 0) {
          const homeStats = stats[0];
          const awayStats = stats[1];
          setHomeStatistics(homeStats ? homeStats.statistics : []);
          setAwayStatistics(awayStats ? awayStats.statistics : []);
        }
      } catch (error) {
        console.error(
          "Error fetching statistics:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchStatistics();
  }, [fixtureId]);

  const calculateGoalAttempts = (statistics) => {
    const shotsOnGoal = parseInt(statistics.find((s) => s.type === "Shots on Goal")?.value) || 0;
    const shotsOffGoal = parseInt(statistics.find((s) => s.type === "Shots off Goal")?.value) || 0;
    const blockedShots = parseInt(statistics.find((s) => s.type === "Blocked Shots")?.value) || 0;
    return shotsOnGoal + shotsOffGoal + blockedShots;
  };

  const statsToDisplay = [
    "Ball Possession",
    "Goal Attemps",
    "Shots on Goal",
    "Shots off Goal",
    "Blocked Shots",
    "Corner Kicks",
    "Offsides",
    "Goalkeeper Saves",
    "Fouls",
    "Yellow Cards",
  ];

  return (
    <StatisticsContainer>
      {statsToDisplay.map((statName) => {
        let homeValue, awayValue;

        if (statName === "Goal Attemps") {
          homeValue = calculateGoalAttempts(homeStatistics);
          awayValue = calculateGoalAttempts(awayStatistics);
        } else {
          const homeStat = homeStatistics.find((s) => s.type === statName);
          const awayStat = awayStatistics.find((s) => s.type === statName);

          if (!homeStat || !awayStat) return null;

          homeValue = parseInt(homeStat.value) || 0;
          awayValue = parseInt(awayStat.value) || 0;
        }

        const total = homeValue + awayValue;
        const homePercentage = total ? (homeValue / total) * 100 : 0;
        const awayPercentage = total ? (awayValue / total) * 100 : 0;

        return (
          <StatisticItem key={statName}>
            <TeamStatistics>
              <span>{homeValue}</span>
              <StyledStatName>{statName}</StyledStatName>
              <span>{awayValue}</span>
            </TeamStatistics>
            <ProgressBarContainer>
              <Progress percentage={homePercentage} />
            </ProgressBarContainer>
          </StatisticItem>
        );
      })}
    </StatisticsContainer>
  );
};

export default FootballStatistics;
