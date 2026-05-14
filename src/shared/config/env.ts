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
   * Base URL for the WebSocket connections.
   * Defaults to '/ws' for local proxy support.
   */
  WS_URL: import.meta.env.VITE_WS_URL || '/',

  /**
   * Direct WebSocket backend URL, to bypass proxy or use specific host.
   */
  BACKEND_WS_URL: import.meta.env.VITE_BACKEND_WS_URL || 'ws://localhost:8000',

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
