import { createImageObjectURL, revokeImageObjectURL, resizeImage } from './imageResizer';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('imageResizer utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createImageObjectURL', () => {
    it('should create object URL from blob', () => {
      const blob = new Blob(['test'], { type: 'image/jpeg' });
      const url = createImageObjectURL(blob);

      expect(url).toBe('blob:mock-url');
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
    });
  });

  describe('revokeImageObjectURL', () => {
    it('should revoke object URL without throwing', () => {
      const url = 'blob:mock-url';

      expect(() => revokeImageObjectURL(url)).not.toThrow();
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(url);
    });
  });

  describe('resizeImage', () => {
    let mockCanvas: HTMLCanvasElement;
    let mockContext: CanvasRenderingContext2D;
    let mockImage: HTMLImageElement;

    beforeEach(() => {
      // Mock canvas and context
      mockCanvas = {
        getContext: jest.fn(),
        width: 0,
        height: 0,
        toBlob: jest.fn(),
      } as unknown as HTMLCanvasElement;

      mockContext = {
        drawImage: jest.fn(),
      } as unknown as CanvasRenderingContext2D;

      mockImage = {
        onload: null,
        onerror: null,
        src: '',
      } as unknown as HTMLImageElement;

      jest.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'canvas') {
          return mockCanvas as any;
        }
        if (tag === 'img') {
          // Trigger onload immediately for tests
          setTimeout(() => {
            if (mockImage.onload) {
              mockImage.onload({} as Event);
            }
          }, 0);
          return mockImage as any;
        }
        return document.createElement(tag);
      });

      (mockCanvas.getContext as jest.Mock).mockReturnValue(mockContext);
      (mockCanvas.toBlob as jest.Mock).mockImplementation((callback) => {
        const mockBlob = new Blob(['resized'], { type: 'image/jpeg' });
        callback(mockBlob);
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should resize image blob successfully', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });

      const resized = await resizeImage(mockBlob, 800, 600, 0.75);

      expect(resized).toBeInstanceOf(Blob);
    });

    it('should return null if context is not available', async () => {
      (mockCanvas.getContext as jest.Mock).mockReturnValue(null);

      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });
      const resized = await resizeImage(mockBlob, 800, 600);

      expect(resized).toBeNull();
    });

    it('should use default quality if not provided', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });

      await resizeImage(mockBlob, 800, 600);

      expect(mockCanvas.toBlob).toHaveBeenCalled();
    });
  });
});
