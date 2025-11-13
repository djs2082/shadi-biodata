export const APP_CONFIG = {
  name: process.env.REACT_APP_NAME || 'Shadi Biodata Maker',
  version: process.env.REACT_APP_VERSION || '2.0.0',
  environment: process.env.NODE_ENV || 'development',
} as const;

export default APP_CONFIG;
