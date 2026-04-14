import { useParams } from "react-router-dom";
import { useTournament, mapTournamentToKeyDates } from "@entities/tournament";
import { TournamentPageLayout } from "./components/TournamentPageLayout";
import { TournamentPageSkeleton } from "./components/TournamentPageSkeleton";
import { TournamentPageError } from "./components/TournamentPageError";
import { TournamentPageBody } from "./components/TournamentPageBody";

/**
 * TournamentPage — Standard composition shell.
 * Orchestrates loading, error, and success states for a single tournament.
 */
export function TournamentPage() {
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : null;
  const { tournament, isLoading, error } = useTournament(parsedId);

  // Business logic moved to entities layer mapping helper
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