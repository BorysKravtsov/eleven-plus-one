import Header from "../../../components/Header/Header";
import TopLeagues from "../../../components/TopLeagues/TopLeagues";
import { leagueIds } from "../index";
export default function Leagues() {
  return (
    <div>
      <Header />
      <TopLeagues leagueIds={leagueIds} />
    </div>
  );
}
