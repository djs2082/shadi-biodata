import { logger } from './logger';

describe('logger utility', () => {
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test info message', { data: 'test' });

      expect(consoleInfoSpy).toHaveBeenCalledWith('Test info message', { data: 'test' });
    });
  });

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Test warning message', 123);

      expect(consoleWarnSpy).toHaveBeenCalledWith('Test warning message', 123);
    });
  });

  describe('error', () => {
    it('should log error messages', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred', error);
    });

    it('should always log errors even in production', () => {
      process.env.NODE_ENV = 'production';

      logger.error('Production error');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Production error');
    });
  });

  describe('debug', () => {
    it('should log debug messages', () => {
      logger.debug('Debug message', { value: 42 });

      expect(consoleDebugSpy).toHaveBeenCalledWith('Debug message', { value: 42 });
    });
  });
});
