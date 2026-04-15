// import { baseApi } from '@shared/api/baseApi';
import { type TeamDomain } from '../model/team.types';
// import { type TeamDto } from '../model/team.types';
// import { mapTeamToDomain } from '../lib/mapTeamToDomain';

import { MOCK_TEAMS } from '@shared/lib/mock/mockData';

/**
 * Team API service.
 */
export const teamApi = {
    /**
     * Fetches the list of teams for a specific tournament.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTeamsByTournamentId: async (tournamentId: number): Promise<TeamDomain[]> => {
        // Тимчасова заглушка для роботи без серверу
        return MOCK_TEAMS;
        /*
        const { data } = await baseApi.get<TeamDto[]>(`/tournaments/${tournamentId}/teams`);
        return data.map(mapTeamToDomain);
        */
    },
};
