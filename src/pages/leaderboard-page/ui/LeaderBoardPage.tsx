import { useParams } from "react-router-dom";

export function LeaderboardPage() {
  const { id } = useParams();

  return <h3>Leaderboard for tournament {id}</h3>;
}