export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Shadi Biodata Maker',
  version: import.meta.env.VITE_APP_VERSION || '2.0.0',
  environment: import.meta.env.MODE || 'development',
} as const;

export default APP_CONFIG;
