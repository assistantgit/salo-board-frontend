import { TournamentDescription as DescriptionEntity, useCurrentTournament } from "@entities/tournament";

/**
 * TournamentDescription wrapper widget using the shared tournament context.
 * Delegates actual rendering to the entity component.
 */
export const TournamentDescription = () => {
    const { tournament } = useCurrentTournament();

    if (!tournament) return null;

    return <DescriptionEntity description={tournament.description} />;
};
