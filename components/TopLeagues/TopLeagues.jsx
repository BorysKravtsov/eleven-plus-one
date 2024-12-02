import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getLeagues } from "../../utils/apiFootball";
import Link from "next/link";

const TopLeaguesHeading = styled.h2`
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 22px 0 13px;
`;

const LeagueFlagStyle = {
  width: "50px",
  height: "50px",
};

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const LeagueListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const StyledList = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LinkToLeague = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 20px;  
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  background-color: #17111d;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 25px;
  flex-direction: column;
  min-width: 200px;
  height: 250px;
  justify-content: center;
  &:hover {
    scale: 1.05;
    transition: all 0.3s ease;
  }
`;


export default function TopLeagues({leagueIds}) {
    const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data.response);
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      }
    };

    fetchLeagues();
  }, []);
  return (
    <div>
      <div className="container">
        <TopLeaguesHeading>Top Leagues</TopLeaguesHeading>
        <LeagueContainer>

      <LeagueListContainer>
        {leagues
          .filter((league) => leagueIds.includes(league.league.id))
          .map((league) => (
            <StyledList key={league.league.id}>
              <LinkToLeague href={`/league/${league.league.id}`}>
                <Image
                  src={
                    league.country.flag
                      ? league.country.flag
                      : "/World_Flag_(2004).svg"
                  }
                  alt={league.league.name}
                  width={50}
                  height={50}
                  style={LeagueFlagStyle}
                />
                {league.league.name}
              </LinkToLeague>
              
            </StyledList>
          ))}
      </LeagueListContainer>
    </LeagueContainer>
      </div>
    </div>
  );
}
