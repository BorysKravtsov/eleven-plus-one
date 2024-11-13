import Header from "../../components/Header/Header";
import PopularLeagues from "../../components/LeagueItem/LeagueItem";
import MatchesList from "../../components/MatchItem/MatchItem";
const leagueIds = [140,39,61,135,78];

export default function Home() {
  return (
    <div>
      <Header />
      <main>

<PopularLeagues leagueIds={leagueIds}/>
<MatchesList leagueIds={leagueIds} />
      </main>
    </div>
  );
}
