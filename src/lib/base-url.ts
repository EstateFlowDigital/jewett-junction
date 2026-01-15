import basePathname from '../base-pathname';

/**
 * Base URL for the application.
 * In development: empty string (root)
 * In production: the configured base path (e.g., /app, /todo-app)
 * Note: Never has a trailing slash
 */
export const baseUrl = basePathname;
