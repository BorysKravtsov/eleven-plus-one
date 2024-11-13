import React, { useEffect, useState } from 'react';
import { getLeagues } from '../../utils/apiFootball';
import Image from 'next/image';
import styled from 'styled-components';

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
`;

export default function PopularLeagues({ leagueIds }) {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data.response);
      } catch (error) {
        console.error('Failed to fetch leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="container">
      <h2>Leagues</h2>
      <ul>
        {leagues
          .filter(league => leagueIds.includes(league.league.id))
          .map(league => (
            <StyledList key={league.league.id}>
              <Image src={league.country.flag ? league.country.flag : "/World_Flag_(2004).svg"} alt={league.league.name} width={16} height={16} />
              {league.league.name}
              <a href="#"><Image src="/notFavorite.svg" alt="not favorite" width={12} height={12}/></a>
            </StyledList>
          ))}
      </ul>
    </div>
  );
}
