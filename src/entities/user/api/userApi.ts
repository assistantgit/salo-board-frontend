import { baseApi } from "@shared/api/baseApi";
import type { UserProfileDto, PatchedUserProfileDto } from "../model/types";

export const userApi = {
  getProfile: async (): Promise<UserProfileDto> => {
    const { data } = await baseApi.get<UserProfileDto>('/user');
    return data;
  },

  updateProfile: async (profileData: PatchedUserProfileDto): Promise<UserProfileDto> => {
    const { data } = await baseApi.patch<UserProfileDto>('/user', profileData);
    return data;
  },
};
