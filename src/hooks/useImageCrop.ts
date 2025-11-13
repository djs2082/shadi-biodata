import { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import type Cropper from 'react-cropper';

import { resizeImage } from '../utils/imageResizer';

interface CropOptions {
  width: number;
  height: number;
  quality?: number;
}

/**
 * Custom hook for managing image cropping functionality
 * Handles cropper instance, zoom controls, and crop save operations
 */
export const useImageCrop = () => {
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  /**
   * Initialize cropper instance
   * @param instance - Cropper instance from onInitialized callback
   */
  const initializeCropper = (instance: Cropper) => {
    setCropper(instance);
  };

  /**
   * Handle mouse wheel zoom on cropper
   * @param event - Wheel event
   */
  const handleZoom = (event: React.WheelEvent) => {
    event.preventDefault();

    if (!cropper) return;

    const zoomRatio = event.deltaY < 0 ? 0.1 : -0.1;
    const currentZoom = cropper.getData().scaleX;
    const newZoom = currentZoom + zoomRatio;

    // Restrict zoom to minimum of 1 (original size)
    if (newZoom >= 1) {
      cropper.zoom(zoomRatio);
    }
  };

  /**
   * Get cropped image as blob
   * @param options - Crop options (width, height, quality)
   * @returns Promise resolving to cropped and resized blob
   */
  const getCroppedBlob = async (options: CropOptions): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!cropper) {
        resolve(null);
        return;
      }

      cropper.getCroppedCanvas().toBlob(
        async (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          // Resize the cropped image
          const resizedBlob = await resizeImage(
            blob,
            options.width,
            options.height,
            options.quality || 0.75
          );

          resolve(resizedBlob);
        },
        'image/jpeg',
        options.quality || 0.75
      );
    });
  };

  /**
   * Open crop modal
   */
  const openCropModal = () => {
    setShowCropModal(true);
  };

  /**
   * Close crop modal and cleanup
   */
  const closeCropModal = () => {
    setShowCropModal(false);
  };

  /**
   * Destroy cropper instance
   */
  const destroyCropper = () => {
    cropper?.destroy();
    setCropper(null);
  };

  return {
    cropper,
    showCropModal,
    initializeCropper,
    handleZoom,
    getCroppedBlob,
    openCropModal,
    closeCropModal,
    destroyCropper,
  };
};
