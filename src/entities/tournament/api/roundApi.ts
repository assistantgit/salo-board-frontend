import { baseApi } from '@shared/api/baseApi';
import type {
  RoundDto,
  RoundAttachmentDto,
  EvaluationCriterionDto,
  RoundRequirementDto,
} from '../model/tournament.types';

export const roundApi = {
  getRounds: async (tournamentId: number): Promise<RoundDto[]> => {
    const { data } = await baseApi.get<RoundDto[]>(`/tournaments/${tournamentId}/rounds`);
    return data;
  },

  getRoundDetails: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.get<RoundDto>(`/tournaments/${tournamentId}/rounds/${roundId}`);
    return data;
  },

  getRoundAttachments: async (tournamentId: number, roundId: number): Promise<RoundAttachmentDto[]> => {
    const { data } = await baseApi.get<RoundAttachmentDto[]>(`/tournaments/${tournamentId}/rounds/${roundId}/attachments`);
    return data;
  },

  getRoundCriterions: async (tournamentId: number, roundId: number): Promise<EvaluationCriterionDto[]> => {
    const { data } = await baseApi.get<EvaluationCriterionDto[]>(`/tournaments/${tournamentId}/rounds/${roundId}/criterions`);
    return data;
  },

  getRoundRequirements: async (tournamentId: number, roundId: number): Promise<RoundRequirementDto[]> => {
    const { data } = await baseApi.get<RoundRequirementDto[]>(`/tournaments/${tournamentId}/rounds/${roundId}/requirements`);
    return data;
  },
};
