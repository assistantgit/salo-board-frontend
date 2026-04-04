
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '../lib/storage/tokenStorage';

export const baseApi: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor: Injects access token before sending.
 */
baseApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Handles 401 Unauthorized and auto-refresh logic.
 */
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for auth endpoints (to handle wrong password etc. correctly)
    const isAuthUrl = originalRequest.url?.includes('/login') ||
                      originalRequest.url?.includes('/register') ||
                      originalRequest.url?.includes('/token/refresh');

    // Retry once if 401 occurs and refresh token is available
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthUrl) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          // Attempt to get a new access token
          const { data } = await axios.post<{ access: string }>('/api/token/refresh', {
            refresh: refreshToken,
          });

          // Save new access token and retry the original request
          tokenStorage.setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          return baseApi(originalRequest);
        } catch (refreshError) {
          // Refreshing failed (refresh token expired) -> logout
          tokenStorage.clearTokens();
          // Redirect to login or emit logout event
          window.dispatchEvent(new CustomEvent('auth:logout'));
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
