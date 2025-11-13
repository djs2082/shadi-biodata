import { fileTypeFromBuffer, FileTypeResult } from 'file-type';

/**
 * Image validation utilities for file upload
 */

export const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
export const ALLOWED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

/**
 * Checks if a file's MIME type is a valid image format
 * @param mimeType - File type result from file-type library
 * @returns true if valid image format
 */
export const isValidImageFormat = (
  mimeType: FileTypeResult | undefined
): boolean => {
  if (!mimeType) return false;
  const fileType = mimeType.mime.split('/')[0];
  return fileType === 'image';
};

/**
 * Validates if file size is within allowed limit
 * @param size - File size in bytes
 * @returns true if within limit
 */
export const isValidFileSize = (size: number): boolean => {
  return size <= MAX_IMAGE_SIZE;
};

/**
 * Detects file type from binary data
 * @param buffer - Uint8Array buffer of file data
 * @returns Promise resolving to FileTypeResult or undefined
 */
export const detectFileType = async (
  buffer: Uint8Array
): Promise<FileTypeResult | undefined> => {
  return await fileTypeFromBuffer(buffer);
};

/**
 * Validates an image file for upload
 * @param file - The File object to validate
 * @returns Promise resolving to validation result
 */
export const validateImageFile = async (
  file: File
): Promise<{
  valid: boolean;
  error?: string;
  mimeType?: FileTypeResult;
}> => {
  // Check file size
  if (!isValidFileSize(file.size)) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_IMAGE_SIZE / (1024 * 1024)}MB limit`,
    };
  }

  // Read file as array buffer for type detection
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Detect actual file type
  const mimeType = await detectFileType(uint8Array);

  // Validate format
  if (!isValidImageFormat(mimeType)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload an image file.',
    };
  }

  return {
    valid: true,
    mimeType,
  };
};
