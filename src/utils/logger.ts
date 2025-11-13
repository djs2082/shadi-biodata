const isDevelopment = process.env.NODE_ENV === 'development';

/* eslint-disable no-console */
export const logger = {
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info('[INFO]', ...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn('[WARN]', ...args);
    }
  },

  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
    // In production, send to error tracking service (e.g., Sentry)
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  },
};

export default logger;
