import { baseApi } from '@shared/api/baseApi';
import type {
  PatchedUserProfileDto,
  UserProfileDto,
  UserShortProfileDto,
  UserSubmissionDto,
  UserTournamentDto,
} from '../model/types';

export const userApi = {
  getProfile: async (): Promise<UserProfileDto> => {
    const { data } = await baseApi.get<UserProfileDto>('/user');
    return data;
  },

  getShortProfile: async (): Promise<UserShortProfileDto> => {
    const { data } = await baseApi.get<UserShortProfileDto>('/user/name');
    return data;
  },

  updateProfile: async (profileData: PatchedUserProfileDto): Promise<UserProfileDto> => {
    const { data } = await baseApi.patch<UserProfileDto>('/user', profileData);
    return data;
  },

  getSubmissions: async (): Promise<UserSubmissionDto[]> => {
    const { data } = await baseApi.get<UserSubmissionDto[]>('/user/submissions');
    return data;
  },

  getTournamentHistory: async (): Promise<UserTournamentDto[]> => {
    const { data } = await baseApi.get<UserTournamentDto[]>('/user/tournament-history');
    return data;
  },
};
