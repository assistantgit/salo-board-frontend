import { baseApi } from '@shared/api/baseApi';
import type {
  PatchedUserProfileDto,
  TelegramLinkDto,
  TelegramStatusDto,
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

  getTelegramLink: async (): Promise<TelegramLinkDto> => {
    const { data } = await baseApi.get<TelegramLinkDto>('/user/telegram-link');
    return data;
  },

  getTelegramStatus: async (): Promise<TelegramStatusDto> => {
    const { data } = await baseApi.get<TelegramStatusDto>('/user/telegram-status');
    return data;
  },
};
