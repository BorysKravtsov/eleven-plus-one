import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Header from "../../../components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import Table from "../../../components/Table/Table";
import Matches from "../../../components/Matches/Matches";

const CountryFlagStyle = {
  width: "25px",
  height: "25px",
};

const LeagueHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 5px 20px;
  background-color: ${({ active }) => (active ? "#00bfb2" : "#17111d")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #fff;
    color: #17111d;
  }
  font-family: "Figtree", sans-serif;
  font-weight: 500;
  font-size: 14px;
`;

const LeagueDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [view, setView] = useState("pastMatches");
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLeagueDetails = async () => {
      try {
        const response = await axios.get(`https://v3.football.api-sports.io/leagues?id=${id}`, {
          headers: {
            "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
            Accept: "application/json",
          },
        });
        setLeagueDetails(response.data.response[0]);
      } catch (error) {
        console.error("Error fetching league details:", error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`, {
          headers: {
            "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
            Accept: "application/json",
          },
        });
        setMatches(response.data.response);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchLeagueDetails(), fetchMatches()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const fetchStandings = async () => {
    try {
      const response = await axios.get(`https://v3.football.api-sports.io/standings?league=${id}&season=2024`, {
        headers: {
          "x-apisports-key": "2eb1d7ee14c0bf909602f696bd8bd2fb",
          Accept: "application/json",
        },
      });

      const standingsData = response.data.response;
      if (standingsData && standingsData.length > 0 && standingsData[0].league) {
        setStandings(standingsData[0].league.standings[0]);
      } else {
        console.error("Standings data is not in the expected format:", standingsData);
      }
    } catch (error) {
      console.error("Error fetching standings:", error);
    }
  };

  const groupMatchesByRound = (matches) => {
    return matches.reduce((acc, match) => {
      const round = match.league.round;
      if (!acc[round]) {
        acc[round] = [];
      }
      acc[round].push(match);
      return acc;
    }, {});
  };

  const pastMatches = matches.filter(match => new Date(match.fixture.date) < new Date());
  const futureMatches = matches.filter(match => new Date(match.fixture.date) >= new Date());

  const pastMatchesByRound = groupMatchesByRound(pastMatches);
  const futureMatchesByRound = groupMatchesByRound(futureMatches);

  if (loading || !leagueDetails) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
      <ButtonContainer>
      <LeagueHeader>
        <Image src={leagueDetails.country.flag} alt={leagueDetails.country.name} width={25} height={25} style={CountryFlagStyle} />
        <h1>{leagueDetails.league.name}</h1>
      </LeagueHeader>
        <Button active={view === "pastMatches"} onClick={() => setView("pastMatches")}>Results</Button>
        <Button active={view === "futureMatches"} onClick={() => setView("futureMatches")}>Fixtures</Button>
        <Button active={view === "leagueTable"} onClick={() => { setView("leagueTable"); fetchStandings(); }}>Table</Button>
      </ButtonContainer>
      {view === "pastMatches" && (
        <Matches matchesByRound={pastMatchesByRound} reverseOrder={true} />
      )}
      {view === "futureMatches" && (
        <Matches matchesByRound={futureMatchesByRound} />
      )}
      {view === "leagueTable" && (
        <Table data={standings} />
      )}
      </div>
    </div>
  );
};

export default LeagueDetails;
