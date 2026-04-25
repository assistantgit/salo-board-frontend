import { useParams } from 'react-router-dom';

export function TournamentRoundDetailsPage() {
  const { roundId } = useParams();
  return <div>Round Details: {roundId} (Work in Progress)</div>;
}
