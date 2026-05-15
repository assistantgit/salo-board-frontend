import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { env } from '../config';
import { tokenStorage } from '../lib/storage/tokenStorage';

export const baseApi: AxiosInstance = axios.create({
  baseURL: env.API_URL,
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
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

/**
 * Response Interceptor: Handles 401 Unauthorized and auto-refresh logic.
 */
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for auth endpoints (to handle wrong password etc. correctly)
    const isAuthUrl =
      originalRequest.url?.includes('/login') ||
      originalRequest.url?.includes('/register') ||
      originalRequest.url?.includes('/token/refresh');

    // Retry once if 401 occurs and refresh token is available
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthUrl) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return baseApi(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          // Attempt to get a new access token
          const { data } = await axios.post<{ access: string }>(`${env.API_URL}/token/refresh`, {
            refresh: refreshToken,
          });

          // Save new access token and retry the original request
          tokenStorage.setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          processQueue(null, data.access);

          return await baseApi(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // Refreshing failed (refresh token expired) -> logout
          tokenStorage.clearTokens();
          // Redirect to login or emit logout event
          window.dispatchEvent(new CustomEvent('auth:logout'));
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
