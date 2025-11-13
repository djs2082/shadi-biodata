/**
 * Image resizer utility using Canvas API
 * Resizes and compresses images to optimize storage and bandwidth
 */

export interface ResizeOptions {
  width: number;
  height: number;
  quality?: number;
  format?: string;
}

/**
 * Resizes an image blob to specified dimensions with compression
 * @param imageBlob - The original image blob
 * @param width - Target width in pixels
 * @param height - Target height in pixels
 * @param quality - JPEG quality (0-1), default 0.7
 * @param format - Output format (image/jpeg, image/png), default image/jpeg
 * @returns Promise resolving to resized blob
 */
export const resizeImage = (
  imageBlob: Blob,
  width: number,
  height: number,
  quality = 0.7,
  format = 'image/jpeg'
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, format, quality);

      // Clean up object URL
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(null);
    };
  });
};

/**
 * Creates an object URL from a blob and automatically manages cleanup
 * @param blob - The image blob
 * @returns Object URL string
 */
export const createImageObjectURL = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

/**
 * Revokes an object URL to prevent memory leaks
 * @param url - The object URL to revoke
 */
export const revokeImageObjectURL = (url: string): void => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};
