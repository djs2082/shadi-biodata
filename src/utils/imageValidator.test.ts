import { isValidImageFormat, MAX_IMAGE_SIZE } from './imageValidator';

describe('imageValidator utils', () => {
  describe('MAX_IMAGE_SIZE', () => {
    it('should be 20MB', () => {
      expect(MAX_IMAGE_SIZE).toBe(20 * 1024 * 1024);
    });
  });

  describe('isValidImageFormat', () => {
    it('should return true for valid image mime types', () => {
      const validMimeTypes = [
        { mime: 'image/jpeg', ext: 'jpg' },
        { mime: 'image/png', ext: 'png' },
        { mime: 'image/gif', ext: 'gif' },
        { mime: 'image/webp', ext: 'webp' },
      ];

      validMimeTypes.forEach((mimeType) => {
        expect(isValidImageFormat(mimeType as any)).toBe(true);
      });
    });

    it('should return false for non-image mime types', () => {
      const invalidMimeTypes = [
        { mime: 'application/pdf', ext: 'pdf' },
        { mime: 'text/plain', ext: 'txt' },
        { mime: 'video/mp4', ext: 'mp4' },
      ];

      invalidMimeTypes.forEach((mimeType) => {
        expect(isValidImageFormat(mimeType as any)).toBe(false);
      });
    });

    it('should return false for undefined mime type', () => {
      expect(isValidImageFormat(undefined)).toBe(false);
    });

    it('should return false for null mime type', () => {
      expect(isValidImageFormat(null as any)).toBe(false);
    });
  });
});
