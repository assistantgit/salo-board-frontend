import { TournamentRules as RulesEntity, useCurrentTournament } from "@entities/tournament";

/**
 * TournamentRules wrapper widget using the shared tournament context.
 * Delegates actual rendering to the entity component.
 */
export const TournamentRules = () => {
    const { tournament } = useCurrentTournament();

    if (!tournament) return null;

    return <RulesEntity rules={tournament.rules} id="tournament-rules" />;
};
