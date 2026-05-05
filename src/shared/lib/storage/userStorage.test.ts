import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { userStorage } from './userStorage';

describe('userStorage', () => {
  const USER_KEY = 'sb_user_short_profile';
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null if no user is set', () => {
    expect(userStorage.getUserName()).toBeNull();
  });

  it('should set and get user profile', () => {
    // any type to bypass strict type checking for the test mock
    userStorage.setUserName(mockUser as any);
    expect(userStorage.getUserName()).toEqual(mockUser);
    expect(localStorage.getItem(USER_KEY)).toBe(JSON.stringify(mockUser));
  });

  it('should clear user profile', () => {
    userStorage.setUserName(mockUser as any);
    userStorage.clear();
    expect(userStorage.getUserName()).toBeNull();
  });

  it('should return null and remove item if stored JSON is invalid', () => {
    localStorage.setItem(USER_KEY, 'invalid-json{]');
    expect(userStorage.getUserName()).toBeNull();
    // It should have removed the corrupted key
    expect(localStorage.getItem(USER_KEY)).toBeNull();
  });
});
