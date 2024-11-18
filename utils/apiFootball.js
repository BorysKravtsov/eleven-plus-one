import axios from 'axios';

const API_KEY = '2eb1d7ee14c0bf909602f696bd8bd2fb'; 
const BASE_URL = 'https://v3.football.api-sports.io';

export const getLeagues = async () => {
  try {
    const response = await fetch(`${BASE_URL}/leagues`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

export const getMatchesByLeagueIds = async (leagueIds) => {
  try {
    const promises = leagueIds.map(id =>
      axios.get(`${BASE_URL}/fixtures?league=${id}&season=2024`, {
        headers: {
          'x-apisports-key': API_KEY,
          'Accept': 'application/json',
        },
      })
    );

    const responses = await Promise.all(promises);
    const data = responses.map(response => response.data);

    const currentDate = new Date();
    const matchesByLeague = {};

    data.forEach(item => {
      item.response.forEach(match => {
        const matchDate = new Date(match.fixture.date);
        if (matchDate > currentDate) {
          const leagueId = match.league.id;
          const matchDay = matchDate.toISOString().split('T')[0];
          if (!matchesByLeague[leagueId] || matchDay < matchesByLeague[leagueId].day) {
            matchesByLeague[leagueId] = { day: matchDay, matches: [match] };
          } else if (matchDay === matchesByLeague[leagueId].day) {
            matchesByLeague[leagueId].matches.push(match);
          }
        }
      });
    });

    return Object.values(matchesByLeague).flatMap(league => league.matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};
  