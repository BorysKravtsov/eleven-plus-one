import Header from "../../components/Header/Header";
import PopularLeagues from "../../components/LeagueItem/LeagueItem";
import MatchesList from "../../components/MatchItem/MatchItem";
import styled from 'styled-components';
const leagueIds = [140,39,61,135,78];

const MainContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <MainContainer>
            <PopularLeagues leagueIds={leagueIds}/>
            <MatchesList leagueIds={leagueIds} />
          </MainContainer>
        </div>
      </main>
    </div>
  );
}
