import type { UserShortProfileDto } from "@entities/user/model/types";

const USER_NAME_KEY = 'sb_user_short_profile';

/**
 * userStorage — storage to persist user identity across sessions.
 * Used for soft-hydration on app start.
 */
export const userStorage = {
  getUserName: (): UserShortProfileDto | null => {
    const data = localStorage.getItem(USER_NAME_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(USER_NAME_KEY);
      return null;
    }
  },

  setUserName: (profile: UserShortProfileDto): void => {
    localStorage.setItem(USER_NAME_KEY, JSON.stringify(profile));
  },

  clear: (): void => {
    localStorage.removeItem(USER_NAME_KEY);
  },
};
