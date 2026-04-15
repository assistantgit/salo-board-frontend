import { baseApi } from '@shared/api/baseApi';
import { type TeamDto, type TeamDomain, mapTeamToDomain } from '../model/team.types';

/**
 * Team API service.
 */
export const teamApi = {
    /**
     * Fetches the list of teams for a specific tournament.
     */
    getTeamsByTournamentId: async (tournamentId: number): Promise<TeamDomain[]> => {
        const { data } = await baseApi.get<TeamDto[]>(`/tournaments/${tournamentId}/teams`);
        return data.map(mapTeamToDomain);
    },
};
