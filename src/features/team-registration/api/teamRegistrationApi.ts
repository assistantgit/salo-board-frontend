import type { TeamDto } from '@entities/team/model/team.types';
import { baseApi } from '@shared/api/baseApi';
import type { CreateTeamRequest } from '../model/types';

export const teamRegistrationApi = {
  createTeam: async (payload: CreateTeamRequest): Promise<TeamDto> => {
    const { data } = await baseApi.post<TeamDto>('/teams', payload);
    return data;
  },
};
