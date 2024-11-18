import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../../components/Header/Header';

const MatchDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [matchDetails, setMatchDetails] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMatchDetails = async () => {
        try {
          const response = await axios.get(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
            headers: {
              'x-apisports-key': '2eb1d7ee14c0bf909602f696bd8bd2fb',
              'Accept': 'application/json',
            },
          });
          setMatchDetails(response.data.response[0] || {});
        } catch (error) {
          console.error('Error fetching match details:', error);
        }
      };

      const fetchStatistics = async () => {
        try {
          const response = await axios.get(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${id}`, {
            headers: {
              'x-apisports-key': 'YOUR_API_KEY',
              'Accept': 'application/json',
            },
          });
          setStatistics(response.data.response || []);
        } catch (error) {
          console.error('Error fetching match statistics:', error);
        }
      };

      fetchMatchDetails();
      fetchStatistics();
    }
  }, [id]);

  if (!matchDetails) return <div>Loading...</div>;

  const { teams, fixture } = matchDetails;

  return (
    <div>
      <Header />
      <h1>Match Details</h1>
      {teams ? (
        <>
          <h2>{teams.home.name} vs {teams.away.name}</h2>
          <p>Date: {new Date(fixture.date).toLocaleDateString("ru-RU")}</p>
          <p>Time: {new Date(fixture.date).toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          <p>Venue: {fixture.venue.name}</p>
          <h3>Statistics</h3>
          {statistics.length > 0 ? (
            statistics.map((stat, index) => (
              <div key={index}>
                <h4>{stat.team.name}</h4>
                <ul>
                  {stat.statistics.map((item, idx) => (
                    <li key={idx}>{item.type}: {item.value}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No statistics available.</p>
          )}
        </>
      ) : (
        <p>Match details are not available.</p>
      )}
    </div>
  );
};

export default MatchDetails;
