import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { tokenStorage } from './tokenStorage';

describe('tokenStorage', () => {
  const ACCESS_KEY = 'sb_access_token';
  const REFRESH_KEY = 'sb_refresh_token';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null when tokens are not set', () => {
    expect(tokenStorage.getAccessToken()).toBeNull();
    expect(tokenStorage.getRefreshToken()).toBeNull();
  });

  it('should set and get access token', () => {
    tokenStorage.setAccessToken('access123');
    expect(tokenStorage.getAccessToken()).toBe('access123');
    expect(localStorage.getItem(ACCESS_KEY)).toBe('access123');
  });

  it('should set and get refresh token', () => {
    tokenStorage.setRefreshToken('refresh123');
    expect(tokenStorage.getRefreshToken()).toBe('refresh123');
    expect(localStorage.getItem(REFRESH_KEY)).toBe('refresh123');
  });

  it('should set both tokens simultaneously', () => {
    tokenStorage.setTokens('acc456', 'ref456');
    expect(tokenStorage.getAccessToken()).toBe('acc456');
    expect(tokenStorage.getRefreshToken()).toBe('ref456');
  });

  it('should clear all tokens', () => {
    tokenStorage.setTokens('acc789', 'ref789');
    tokenStorage.clearTokens();
    expect(tokenStorage.getAccessToken()).toBeNull();
    expect(tokenStorage.getRefreshToken()).toBeNull();
  });
});
