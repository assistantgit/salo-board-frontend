import { baseApi } from '@shared/api/baseApi';
import type {
  EvaluationCriterionDto,
  RoundAttachmentDto,
  RoundDto,
  RoundRequirementDto,
} from '../model/tournament.types';

export const roundApi = {
  getRounds: async (tournamentId: number): Promise<RoundDto[]> => {
    const { data } = await baseApi.get<RoundDto[]>(`/tournaments/${tournamentId}/rounds`);
    return data;
  },

  getAdminRounds: async (tournamentId: number): Promise<RoundDto[]> => {
    const { data } = await baseApi.get<RoundDto[]>(`/admin/tournaments/${tournamentId}/rounds`);
    return data;
  },

  getRoundDetails: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.get<RoundDto>(`/tournaments/${tournamentId}/rounds/${roundId}`);
    return data;
  },

  getAdminRoundDetails: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.get<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/`,
    );
    return data;
  },

  getRoundAttachments: async (
    tournamentId: number,
    roundId: number,
  ): Promise<RoundAttachmentDto[]> => {
    const { data } = await baseApi.get<RoundAttachmentDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/attachments`,
    );
    return data;
  },

  getAdminRoundAttachments: async (
    tournamentId: number,
    roundId: number,
  ): Promise<RoundAttachmentDto[]> => {
    const { data } = await baseApi.get<RoundAttachmentDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/attachments`,
    );
    return data;
  },

  getRoundCriterions: async (
    tournamentId: number,
    roundId: number,
  ): Promise<EvaluationCriterionDto[]> => {
    const { data } = await baseApi.get<EvaluationCriterionDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/criterions`,
    );
    return data;
  },

  getAdminRoundCriterions: async (
    tournamentId: number,
    roundId: number,
  ): Promise<EvaluationCriterionDto[]> => {
    const { data } = await baseApi.get<EvaluationCriterionDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/criterions`,
    );
    return data;
  },

  getRoundRequirements: async (
    tournamentId: number,
    roundId: number,
  ): Promise<RoundRequirementDto[]> => {
    const { data } = await baseApi.get<RoundRequirementDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/requirements`,
    );
    return data;
  },

  getAdminRoundRequirements: async (
    tournamentId: number,
    roundId: number,
  ): Promise<RoundRequirementDto[]> => {
    const { data } = await baseApi.get<RoundRequirementDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/requirements`,
    );
    return data;
  },

  createRound: async (tournamentId: number, payload: Partial<RoundDto>): Promise<RoundDto> => {
    const { data } = await baseApi.post<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds`,
      payload,
    );
    return data;
  },

  updateRound: async (
    tournamentId: number,
    roundId: number,
    payload: Partial<RoundDto>,
  ): Promise<RoundDto> => {
    const { data } = await baseApi.patch<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}`,
      payload,
    );
    return data;
  },

  deleteRound: async (tournamentId: number, roundId: number): Promise<void> => {
    await baseApi.delete(`/admin/tournaments/${tournamentId}/rounds/${roundId}`);
  },

  // Attachments
  createAttachment: async (
    tournamentId: number,
    roundId: number,
    attachment: Partial<RoundAttachmentDto>,
  ): Promise<RoundAttachmentDto> => {
    const { data } = await baseApi.post<RoundAttachmentDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/attachment`,
      attachment,
    );
    return data;
  },

  deleteAttachment: async (
    tournamentId: number,
    roundId: number,
    attachmentId: number,
  ): Promise<void> => {
    await baseApi.delete(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/attachment/${attachmentId}`,
    );
  },

  // Criterions
  createCriterion: async (
    tournamentId: number,
    roundId: number,
    criterion: Partial<EvaluationCriterionDto>,
  ): Promise<EvaluationCriterionDto> => {
    const { data } = await baseApi.post<EvaluationCriterionDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/criterion`,
      criterion,
    );
    return data;
  },

  deleteCriterion: async (
    tournamentId: number,
    roundId: number,
    criterionId: number,
  ): Promise<void> => {
    await baseApi.delete(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/criterion/${criterionId}`,
    );
  },

  // Requirements
  createRequirement: async (
    tournamentId: number,
    roundId: number,
    requirement: Partial<RoundRequirementDto>,
  ): Promise<RoundRequirementDto> => {
    const { data } = await baseApi.post<RoundRequirementDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/requirement`,
      requirement,
    );
    return data;
  },

  deleteRequirement: async (
    tournamentId: number,
    roundId: number,
    requirementId: number,
  ): Promise<void> => {
    await baseApi.delete(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/requirement/${requirementId}`,
    );
  },

  startRound: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.patch<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/start`,
    );
    return data;
  },

  closeSubmissions: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.patch<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/close-submissions`,
    );
    return data;
  },

  closeEvaluations: async (tournamentId: number, roundId: number): Promise<RoundDto> => {
    const { data } = await baseApi.patch<RoundDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/close-evaluations`,
    );
    return data;
  },
};
