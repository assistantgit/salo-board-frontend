import { baseApi } from '@shared/api/baseApi';
import { tokenStorage } from '@shared/lib/storage/tokenStorage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authApi } from './authApi';

vi.mock('@shared/api/baseApi', () => ({
  baseApi: {
    post: vi.fn(),
  },
}));

vi.mock('@shared/lib/storage/tokenStorage', () => ({
  tokenStorage: {
    setTokens: vi.fn(),
    setAccessToken: vi.fn(),
    getRefreshToken: vi.fn(),
    clearTokens: vi.fn(),
  },
}));

describe('authApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call login and save tokens', async () => {
    const mockResponse = { data: { access: 'access_token', refresh: 'refresh_token' } };
    vi.mocked(baseApi.post).mockResolvedValue(mockResponse);

    const credentials = { email: 'test@test.com', password: 'password123' };
    const result = await authApi.login(credentials);

    expect(baseApi.post).toHaveBeenCalledWith('/login', credentials);
    expect(tokenStorage.setTokens).toHaveBeenCalledWith('access_token', 'refresh_token');
    expect(result).toEqual(mockResponse.data);
  });

  it('should call register and save tokens', async () => {
    const mockResponse = { data: { access: 'a', refresh: 'r' } };
    vi.mocked(baseApi.post).mockResolvedValue(mockResponse);

    const userData = { email: 'new@test.com', password: 'password' };
    await authApi.register(userData);

    expect(baseApi.post).toHaveBeenCalledWith('/register', userData);
    expect(tokenStorage.setTokens).toHaveBeenCalledWith('a', 'r');
  });

  it('should call logout and clear tokens', async () => {
    vi.mocked(tokenStorage.getRefreshToken).mockReturnValue('refresh_token');
    vi.mocked(baseApi.post).mockResolvedValue({});

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    await authApi.logout();

    expect(baseApi.post).toHaveBeenCalledWith('/logout', { refresh: 'refresh_token' });
    expect(tokenStorage.clearTokens).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('auth:logout');
  });

  it('should call refresh and update access token', async () => {
    const mockResponse = { data: { access: 'new_access' } };
    vi.mocked(baseApi.post).mockResolvedValue(mockResponse);

    await authApi.refresh('old_refresh');

    expect(baseApi.post).toHaveBeenCalledWith('/token/refresh', { refresh: 'old_refresh' });
    expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('new_access');
  });
});
