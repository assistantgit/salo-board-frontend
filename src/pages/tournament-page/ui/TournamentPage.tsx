import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTournamentStore } from "@entities/tournament";
import { TournamentPageLayout } from "./components/TournamentPageLayout";
import { TournamentPageBody } from "./components/TournamentPageBody";

export function TournamentPage() {
  const { id } = useParams();
  const setCurrentTournamentId = useTournamentStore((s) => s.setCurrentTournamentId);

  useEffect(() => {
    setCurrentTournamentId(id ? parseInt(id, 10) : null);
    return () => setCurrentTournamentId(null);
  }, [id, setCurrentTournamentId]);

  return (
    <TournamentPageLayout>
      <TournamentPageBody />
    </TournamentPageLayout>
  );
}