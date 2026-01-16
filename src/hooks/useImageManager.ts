/**
 * useImageManager Hook
 * Combines all image-related operations into a single hook
 */

import { useImageCrop } from './useImageCrop';
import { useImageStorage } from './useImageStorage';
import { useImageUpload } from './useImageUpload';
import { useUIStore } from '../stores/uiStore';
import {
  DEFAULT_CROP_CONFIG,
  processImageBlob,
} from '../services/imageUploadService';

export const useImageManager = () => {
  // Storage operations
  const { storedImage, saveImage, deleteImage } = useImageStorage();

  // Upload operations
  const {
    selectedImage,
    isFormatValid,
    uploadError,
    inputRef,
    handleFileSelect,
    clearSelection,
  } = useImageUpload();

  // Crop operations
  const {
    showCropModal,
    initializeCropper,
    handleZoom,
    getCroppedBlob,
    openCropModal,
    closeCropModal,
    destroyCropper,
  } = useImageCrop();

  // UI state
  const croppedImage = useUIStore((state) => state.croppedImage);
  const setCroppedImage = useUIStore((state) => state.setCroppedImage);

  // Computed display image
  const displayImage = croppedImage || storedImage;

  /**
   * Handle file selection from input
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const success = await handleFileSelect(e);
    if (success) {
      openCropModal();
    }
  };

  /**
   * Save cropped image
   */
  const saveCroppedImage = async () => {
    const blob = await getCroppedBlob(DEFAULT_CROP_CONFIG);

    if (blob) {
      const objectURL = processImageBlob(blob);
      setCroppedImage(objectURL);
      await saveImage(blob);
      closeCropModal();
      clearSelection();
    }
  };

  /**
   * Cancel cropping
   */
  const cancelCrop = () => {
    closeCropModal();
    clearSelection();
    setCroppedImage(null);
  };

  /**
   * Remove current image
   */
  const removeImage = async () => {
    clearSelection();
    setCroppedImage(null);
    await deleteImage();
    destroyCropper();
  };

  /**
   * Trigger file input
   */
  const triggerUpload = () => {
    document.getElementById('fileInput')?.click();
  };

  return {
    // State
    displayImage,
    selectedImage,
    isFormatValid,
    uploadError,
    showCropModal,
    inputRef,

    // Actions
    handleFileChange,
    saveCroppedImage,
    cancelCrop,
    removeImage,
    triggerUpload,

    // Crop handlers
    initializeCropper,
    handleZoom,
  };
};
