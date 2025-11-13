export const API_ENDPOINTS = {
  COUNTER: {
    BASE_URL:
      process.env.REACT_APP_COUNTER_API_URL || 'https://api.counterapi.dev/v1',
    API_KEY: process.env.REACT_APP_COUNTER_API_KEY || '',
  },
} as const;

export default API_ENDPOINTS;
