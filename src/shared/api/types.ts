export interface ApiError {
  detail?: string;
  code?: string;
  error?: string;
  [key: string]: unknown;
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

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
