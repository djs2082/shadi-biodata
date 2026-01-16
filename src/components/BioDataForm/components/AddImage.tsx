/**
 * AddImage Component - Highly Refactored
 * Clean, granular component using composition pattern
 * Handles profile picture upload, cropping, and display
 */

import React from 'react';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useImageManager } from '../../../hooks/useImageManager';
import {
  UploadPrompt,
  ImagePreview,
  ImageControls,
  FileInput,
  ErrorMessage,
  CropModal,
} from './ImageUpload';

/**
 * ImageContainer - Wrapper for image display with controls
 */
const ImageContainer: React.FC<{
  displayImage: string;
  imageName: string;
  onReplace: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
  isMobile: boolean;
}> = ({ displayImage, imageName, onReplace, onRemove, isMobile }) => (
  <>
    <ImageControls
      onReplace={onReplace}
      onRemove={onRemove}
      isMobile={isMobile}
    />
    <ImagePreview src={displayImage} alt={imageName} />
  </>
);

/**
 * Main AddImage Component
 */
const AddImage: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    displayImage,
    selectedImage,
    isFormatValid,
    uploadError,
    showCropModal,
    inputRef,
    handleFileChange,
    saveCroppedImage,
    cancelCrop,
    removeImage,
    triggerUpload,
    initializeCropper,
    handleZoom,
  } = useImageManager();

  /**
   * Handle remove button click
   */
  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removeImage();
  };

  /**
   * Handle replace button click
   */
  const handleReplace = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removeImage();
    triggerUpload();
  };

  /**
   * Handle container click (only trigger upload if no image)
   */
  const handleContainerClick = () => {
    if (!displayImage) {
      triggerUpload();
    }
  };

  return (
    <div className="profile-image-container">
      <div
        className="biodata-profile-picture-wrapper"
        onClick={handleContainerClick}
      >
        {/* File Input */}
        <FileInput
          inputRef={inputRef}
          onChange={handleFileChange}
          disabled={showCropModal}
        />

        {/* Content - Upload Prompt or Image */}
        {displayImage ? (
          <ImageContainer
            displayImage={displayImage}
            imageName={selectedImage.name || 'Profile Picture'}
            onReplace={handleReplace}
            onRemove={handleRemove}
            isMobile={isMobile}
          />
        ) : (
          <UploadPrompt />
        )}

        {/* Error Message */}
        {!isFormatValid && uploadError && (
          <ErrorMessage message={uploadError} />
        )}
      </div>

      {/* Crop Modal */}
      <CropModal
        show={showCropModal}
        imageSource={selectedImage.file as string}
        onClose={cancelCrop}
        onSave={saveCroppedImage}
        onZoom={handleZoom}
        onInitialize={initializeCropper}
        isMobile={isMobile}
      />
    </div>
  );
};

export default AddImage;
