import { baseApi } from "@shared/api/baseApi";
import type { UserProfileDto, PatchedUserProfileDto, UserShortProfileDto } from "../model/types";

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
};
