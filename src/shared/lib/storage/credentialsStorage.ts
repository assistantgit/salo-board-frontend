/**
 * credentialsStorage — utility for interacting with the Credential Management API
 * and persisting the last used email for better UX.
 */

const LAST_EMAIL_KEY = 'sb_last_login_email';

export const credentialsStorage = {
  /**
   * Saves the last used email to localStorage for pre-filling.
   */
  saveLastEmail: (email: string): void => {
    localStorage.setItem(LAST_EMAIL_KEY, email);
  },

  /**
   * Gets the last used email from localStorage.
   */
  getLastEmail: (): string => {
    return localStorage.getItem(LAST_EMAIL_KEY) || '';
  },

  /**
   * Uses the Credential Management API to store credentials in the browser's vault.
   * This triggers the "Save Password" prompt in most browsers.
   */
  storeCredentials: async (email: string, password: string): Promise<void> => {
    if (!window.PasswordCredential || !navigator.credentials) {
      return;
    }

    try {
      const credential = new window.PasswordCredential({
        id: email,
        password: password,
      });

      await navigator.credentials.store(credential);
    } catch (err) {
      console.warn('Credential Management API error:', err);
    }
  },
};

// Type definitions for Credential Management API if not present in TS environment
declare global {
  interface Window {
    PasswordCredential: any;
  }
}
