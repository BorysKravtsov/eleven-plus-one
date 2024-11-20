import Header from "../../components/Header/Header";
import MatchesList from "../../components/MatchItem/MatchItem";
import styled from 'styled-components';
export const leagueIds = [140,39,61,135,78];

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
            <MatchesList leagueIds={leagueIds} />
          </MainContainer>
        </div>
      </main>
    </div>
  );
}
