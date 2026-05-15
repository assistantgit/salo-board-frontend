import type { SubmissionDto, SubmissionStatus } from '@entities/team/model/team.types';
import { baseApi } from '@shared/api/baseApi';

export interface SubmitWorkPayload {
  round?: number;
  githubUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  description?: string;
  status?: SubmissionStatus;
}

export const tournamentSubmissionApi = {
  createSubmission: async (teamId: number, payload: SubmitWorkPayload): Promise<SubmissionDto> => {
    const { data } = await baseApi.post<SubmissionDto>(`/teams/${teamId}/submit`, payload);
    return data;
  },

  updateSubmission: async (
    teamId: number,
    submitId: number,
    payload: SubmitWorkPayload,
  ): Promise<SubmissionDto> => {
    const { data } = await baseApi.patch<SubmissionDto>(
      `/teams/${teamId}/submit/${submitId}`,
      payload,
    );
    return data;
  },

  changeStatus: async (
    teamId: number,
    submitId: number,
    status: SubmissionStatus,
  ): Promise<SubmissionDto> => {
    const { data } = await baseApi.patch<SubmissionDto>(`/teams/${teamId}/submit/${submitId}`, {
      status,
    });
    return data;
  },
};
