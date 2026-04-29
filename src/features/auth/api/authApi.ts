import { baseApi } from '@shared/api/baseApi';
import type { RefreshTokenResponse, TokenResponse } from '@shared/api/types';
import { tokenStorage } from '@shared/lib/storage/tokenStorage';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Authentication API — features/auth layer.
 *
 * - login:    POST /login    → TokenResponse (saves tokens)
 * - register: POST /register → TokenResponse (saves tokens)
 * - logout:   POST /logout   → void (clears tokens, emits event)
 * - refresh:  POST /token/refresh → TokenResponse (updates access)
 */
export const authApi = {
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const { data } = await baseApi.post<TokenResponse>('/login', credentials);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
  },

  register: async (userData: RegisterRequest): Promise<TokenResponse> => {
    const { data } = await baseApi.post<TokenResponse>('/register', userData);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) {
        await baseApi.post('/logout', { refresh: refreshToken });
      }
    } finally {
      tokenStorage.clearTokens();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  },

  refresh: async (token: string): Promise<RefreshTokenResponse> => {
    const { data } = await baseApi.post<RefreshTokenResponse>('/token/refresh', {
      refresh: token,
    });
    tokenStorage.setAccessToken(data.access);
    return data;
  },
};
