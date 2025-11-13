export const CROP_DIMENSIONS = {
  mobile: {
    width: 160,
    height: 228.6,
  },
  desktop: {
    width: 280,
    height: 400,
  },
  aspectRatio: 280 / 400, // 0.7
} as const;

export const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
] as const;
export const IMAGE_QUALITY = 0.75;
export const RESIZED_IMAGE_DIMENSIONS = {
  width: 800,
  height: 600,
};

export default CROP_DIMENSIONS;
