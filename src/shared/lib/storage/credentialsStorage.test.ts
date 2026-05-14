import { describe, expect, it } from 'vitest';
import { credentialsStorage } from './credentialsStorage';

describe('credentialsStorage', () => {
  it('should save and get last email', () => {
    const email = 'test@example.com';
    credentialsStorage.saveLastEmail(email);
    expect(credentialsStorage.getLastEmail()).toBe(email);
  });

  it('should return empty string if no email saved', () => {
    localStorage.clear();
    expect(credentialsStorage.getLastEmail()).toBe('');
  });

  it('should not crash if Credential Management API is not supported', async () => {
    // Mock navigator.credentials to be undefined
    const originalCredentials = navigator.credentials;
    // @ts-expect-error
    delete navigator.credentials;

    await expect(
      credentialsStorage.storeCredentials('test@test.com', 'password'),
    ).resolves.toBeUndefined();

    // Restore
    // @ts-expect-error
    navigator.credentials = originalCredentials;
  });
});
