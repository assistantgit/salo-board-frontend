import { baseApi } from '@shared/api/baseApi';
import { type TeamDomain, type TeamDto } from '../model/team.types';
import { mapTeamToDomain } from '../lib/mapTeamToDomain';

export const teamApi = {
    getTeamsByTournamentId: async (tournamentId: number): Promise<TeamDomain[]> => {
        const { data } = await baseApi.get<TeamDto[]>(`/tournaments/${tournamentId}/teams`);
        return data.map(mapTeamToDomain);
    },
};
