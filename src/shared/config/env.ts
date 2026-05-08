/**
 * Centralized environment variables configuration.
 * Adheres to SOLID principles by providing an abstraction layer over Vite's import.meta.env.
 */
export const env = {
  /**
   * Base URL for the API.
   * Defaults to '/api' for local proxy support.
   */
  API_URL: import.meta.env.VITE_API_URL || '/api',

  /**
   * Current application mode (e.g., 'development', 'production', 'staging').
   */
  MODE: import.meta.env.MODE,

  /**
   * True if running in production mode.
   */
  IS_PROD: import.meta.env.PROD,

  /**
   * True if running in development mode.
   */
  IS_DEV: import.meta.env.DEV,
} as const;
