/**
 * Image Upload Service
 * Handles business logic for image upload, cropping, and storage
 */

import { createImageObjectURL } from '../utils/imageResizer';

export interface CropConfig {
  width: number;
  height: number;
  quality: number;
}

export const DEFAULT_CROP_CONFIG: CropConfig = {
  width: 800,
  height: 600,
  quality: 0.75,
};

/**
 * Process and create object URL from blob
 */
export const processImageBlob = (blob: Blob): string => {
  return createImageObjectURL(blob);
};

/**
 * Validate file size (max 20MB)
 */
export const validateFileSize = (file: File): boolean => {
  const MAX_SIZE = 20 * 1024 * 1024; // 20MB in bytes
  return file.size <= MAX_SIZE;
};

/**
 * Validate file type (images only)
 */
export const validateFileType = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Validate file for upload
 */
export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  if (!validateFileType(file)) {
    return { isValid: false, error: 'Please upload a valid image file' };
  }

  if (!validateFileSize(file)) {
    return { isValid: false, error: 'File size must be less than 20MB' };
  }

  return { isValid: true };
};

/**
 * Get aspect ratio dimensions
 */
export const getAspectRatioDimensions = (isMobile: boolean) => ({
  height: isMobile ? 228.6 : 400,
  width: isMobile ? 160 : 280,
});
