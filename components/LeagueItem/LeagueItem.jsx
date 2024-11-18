import React, { useEffect, useState } from "react";
import { getLeagues } from "../../utils/apiFootball";
import Image from "next/image";
import styled from "styled-components";

const LeagueHeading = styled.h2`
  margin-top: 10px;
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
`;

const LinkToLeague = styled.a`
  display: flex;
  gap: 5px;
`;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 170px;
`;

const StyledList = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 7px;
  align-items: center;
  font-size: 12px;
  max-width: 133px;
  margin-top: 13px;
  line-height: 100%;
  width: 100%;
  text-align: left;
  font-size: 13px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
`;

const LeagueListContainer = styled.ul`
  background-color: #17111d;
  padding: 15px  15px 28px;
  border-radius: 4px;
`;

export default function PopularLeagues({ leagueIds }) {
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
    <LeagueContainer>
      <LeagueHeading>Leagues</LeagueHeading>
      <LeagueListContainer>
        {leagues
          .filter((league) => leagueIds.includes(league.league.id))
          .map((league) => (
            <StyledList key={league.league.id}>
              <LinkToLeague href="#">
                <Image
                  src={
                    league.country.flag
                      ? league.country.flag
                      : "/World_Flag_(2004).svg"
                  }
                  alt={league.league.name}
                  width={16}
                  height={16}
                />
                {league.league.name}
              </LinkToLeague>
              <a href="#">
                <Image
                  src="/notFavorite.svg"
                  alt="not favorite"
                  width={12}
                  height={12}
                />
              </a>
            </StyledList>
          ))}
      </LeagueListContainer>
    </LeagueContainer>
  );
}
