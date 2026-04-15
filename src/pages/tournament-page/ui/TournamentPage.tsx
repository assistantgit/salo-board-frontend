import { useParams } from "react-router-dom";
import { useTournament, mapTournamentToKeyDates } from "@entities/tournament";
import { TournamentPageLayout } from "./components/TournamentPageLayout";
import { TournamentPageSkeleton } from "./components/TournamentPageSkeleton";
import { TournamentPageError } from "./components/TournamentPageError";
import { TournamentPageBody } from "./components/TournamentPageBody";

export function TournamentPage() {
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : null;
  const { tournament, isLoading, error } = useTournament(parsedId);

  const keyDates = tournament ? mapTournamentToKeyDates(tournament) : [];

  return (
    <TournamentPageLayout>
      {isLoading && <TournamentPageSkeleton />}

      {(error || (!tournament && !isLoading)) && (
        <TournamentPageError message={error || 'Турнір не знайдено'} />
      )}

      {tournament && !isLoading && (
        <TournamentPageBody tournament={tournament} keyDates={keyDates} />
      )}
    </TournamentPageLayout>
  );
}