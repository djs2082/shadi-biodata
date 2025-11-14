export const API_ENDPOINTS = {
  COUNTER: {
    BASE_URL:
      import.meta.env.VITE_COUNTER_API_URL || 'https://api.counterapi.dev/v1',
    API_KEY: import.meta.env.VITE_COUNTER_API_KEY || '',
  },
} as const;

export default API_ENDPOINTS;
