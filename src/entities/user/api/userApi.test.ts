import { baseApi } from '@shared/api/baseApi';
import { describe, expect, it, vi } from 'vitest';
import { userApi } from './userApi';

vi.mock('@shared/api/baseApi', () => ({
  baseApi: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('userApi', () => {
  it('getProfile should call GET /user', async () => {
    const mockData = { id: 1, name: 'Test User' };
    vi.mocked(baseApi.get).mockResolvedValue({ data: mockData });

    const result = await userApi.getProfile();

    expect(baseApi.get).toHaveBeenCalledWith('/user');
    expect(result).toEqual(mockData);
  });

  it('getShortProfile should call GET /user/name', async () => {
    const mockData = { name: 'Test User' };
    vi.mocked(baseApi.get).mockResolvedValue({ data: mockData });

    const result = await userApi.getShortProfile();

    expect(baseApi.get).toHaveBeenCalledWith('/user/name');
    expect(result).toEqual(mockData);
  });

  it('updateProfile should call PATCH /user', async () => {
    const patchData = { name: 'Updated Name' };
    const mockData = { id: 1, ...patchData };
    vi.mocked(baseApi.patch).mockResolvedValue({ data: mockData });

    const result = await userApi.updateProfile(patchData);

    expect(baseApi.patch).toHaveBeenCalledWith('/user', patchData);
    expect(result).toEqual(mockData);
  });

  it('getSubmissions should call GET /user/submissions', async () => {
    const mockData = [{ id: 101, title: 'Submission 1' }];
    vi.mocked(baseApi.get).mockResolvedValue({ data: mockData });

    const result = await userApi.getSubmissions();

    expect(baseApi.get).toHaveBeenCalledWith('/user/submissions');
    expect(result).toEqual(mockData);
  });

  it('getTournamentHistory should call GET /user/tournament-history', async () => {
    const mockData = [{ id: 201, title: 'Tournament 1' }];
    vi.mocked(baseApi.get).mockResolvedValue({ data: mockData });

    const result = await userApi.getTournamentHistory();

    expect(baseApi.get).toHaveBeenCalledWith('/user/tournament-history');
    expect(result).toEqual(mockData);
  });
});
