import { useParams } from "react-router-dom";


export function TournamentPage() {
  const { id } = useParams();

  return (
    <div className="tournament-page">
      <div>Турнір: {id}</div>
    </div>
  )
}