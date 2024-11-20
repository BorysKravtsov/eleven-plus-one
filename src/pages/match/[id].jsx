import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../../components/Header/Header";
import styled from "styled-components";
import Image from "next/image";
import FootballStatistics from "../../../components/FootballStatistics/FootballStatistics";
import TeamLineups from "../../../components/TeamLineups/TeamLineups";
import { getTeamLineups, getMatchScore } from "../../../utils/apiFootball";

const MatchHeading = styled.h1`
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 22px 0 13px;
  align-t
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  flex-direction: column;
  font-size: 12px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
  height: auto;
`;

const SpanInfo = styled.span`
  font-weight: 300;
`;

const TeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin: 50px auto ;
`;

const TeamHome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-width: 200px; 
`;

const TeamAway = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-width: 200px; 
`;

const TeamLogoContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const TeamName = styled.h2`
  font-size: 20px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
`;      

const StyledDate = styled.p`
  font-size: 16px;
`;

const StyledTime = styled.p`
  font-size: 16px;
`;

const StyledVenue = styled.p`
  font-size: 16px;
`;

const StyledStatistics = styled.h3`
  font-size: 20px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  text-align: center;
`;

const Score = styled.p`
  font-size: 36px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  text-align: center;
`;

const MatchDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [matchDetails, setMatchDetails] = useState(null);
  const [lineups, setLineups] = useState({
    home: [],
    away: [],
    homeSubs: [],
    awaySubs: [],
    homeCoach: "",
    awayCoach: ""
  });
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMatchDetails = async () => {
        try {
          const response = await axios.get(
            `https://v3.football.api-sports.io/fixtures?id=${id}`,
            {
              headers: {
                "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
                Accept: "application/json",
              },
            }
          );
          const matchData = response.data.response[0];
          setMatchDetails(matchData || {});
          const homeGoals = matchData.goals.home || 0;
          const awayGoals = matchData.goals.away || 0;
          setScore(`${homeGoals} - ${awayGoals}`);

          const lineupsData = await getTeamLineups(id);
          if (lineupsData && lineupsData.length > 0) {
            const homeTeam = lineupsData[0];
            const awayTeam = lineupsData[1];
            setLineups({
              home: homeTeam.startXI.map(player => player.player.name),
              away: awayTeam.startXI.map(player => player.player.name),
              homeSubs: homeTeam.substitutes.map(player => player.player.name),
              awaySubs: awayTeam.substitutes.map(player => player.player.name),
              homeCoach: homeTeam.coach.name,
              awayCoach: awayTeam.coach.name
            });
          }
        } catch (error) {
          console.error("Error fetching match details or lineups:", error);
          setScore("-");
        }
      };

      fetchMatchDetails();
    }
  }, [id]);

  if (!matchDetails) return <div>Loading...</div>;

  const { teams, fixture } = matchDetails;
  const matchDate = new Date(fixture.date);
  const isFutureMatch = matchDate > new Date();

  return (
    <div>
      <Header />
      <div className="container">
        <MatchHeading>Match Details</MatchHeading>
        {teams ? (
          <>
            <TeamsContainer>
              <TeamHome>
                <TeamLogoContainer>
                  <Image src={teams.home.logo} alt={teams.home.name} width={100} height={100} />
                </TeamLogoContainer>
                <TeamName>
                  {teams.home.name}
                </TeamName>
              </TeamHome>
              <DateContainer>
                <StyledDate>Date: <SpanInfo>{matchDate.toLocaleDateString("en-US")}</SpanInfo> </StyledDate>
                <StyledTime>
                  Time:{" "}<SpanInfo>{matchDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}</SpanInfo>
                </StyledTime>
                <StyledVenue>Stadium: <SpanInfo>{fixture.venue.name}</SpanInfo></StyledVenue>
                <Score>
                {fixture.status.short === "FT" && score ? score : "-"}
              </Score>
              </DateContainer>
              
              <TeamAway>
                <TeamLogoContainer>
                  <Image src={teams.away.logo} alt={teams.away.name} width={100} height={100} />
                </TeamLogoContainer>
                <TeamName>
                  {teams.away.name}
                </TeamName>
              </TeamAway>
            </TeamsContainer>

            {!isFutureMatch && (
              <>
                <StyledStatistics>Statistics</StyledStatistics>
                <FootballStatistics fixtureId={id} />
                <TeamLineups
                  homeSquad={lineups.home}
                  awaySquad={lineups.away}
                  homeSubstitutes={lineups.homeSubs}
                  awaySubstitutes={lineups.awaySubs}
                  homeCoach={lineups.homeCoach}
                  awayCoach={lineups.awayCoach}
                />
              </>
            )}
          </>
        ) : (
          <p>Match details are not available.</p>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
