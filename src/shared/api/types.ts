export interface ApiError {
  detail?: string;
  code?: string;
  error?: string;
  [key: string]: any;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface BaseResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
