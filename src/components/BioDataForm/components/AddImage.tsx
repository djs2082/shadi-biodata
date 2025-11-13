import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton, Tooltip } from '@mui/material';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

import { useImageCrop } from '../../../hooks/useImageCrop';
import { useImageStorage } from '../../../hooks/useImageStorage';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useUIStore } from '../../../stores/uiStore';
import { createImageObjectURL } from '../../../utils/imageResizer';
import PrimaryButton from '../../atoms/PrimaryButton';
import SecondaryButton from '../../atoms/SecondaryButton';
import imageFrameOld from '../../BioDataTemplates/images/imageFrameOld2.png';
import CustomModal from '../../molecules/Modals/Modal';

/**
 * AddImage Component - Refactored
 * Handles profile picture upload, cropping, and display
 * Now uses custom hooks for separation of concerns
 */
const AddImage = () => {
  const isMobile = useIsMobile();

  // Custom hooks for image management
  const { storedImage, saveImage, deleteImage } = useImageStorage();
  const {
    selectedImage,
    isFormatValid,
    uploadError,
    inputRef,
    handleFileSelect,
    clearSelection,
  } = useImageUpload();
  const {
    showCropModal,
    initializeCropper,
    handleZoom,
    getCroppedBlob,
    openCropModal,
    closeCropModal,
    destroyCropper,
  } = useImageCrop();

  // UI state for cropped image
  const croppedImage = useUIStore((state) => state.croppedImage);
  const setCroppedImage = useUIStore((state) => state.setCroppedImage);
  const displayImage = croppedImage || storedImage;

  /**
   * Handle file input change
   */
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const success = await handleFileSelect(e);
    if (success) {
      openCropModal();
    }
  };

  /**
   * Save cropped profile picture
   */
  const saveProfilePicture = async () => {
    const blob = await getCroppedBlob({
      width: 800,
      height: 600,
      quality: 0.75,
    });

    if (blob) {
      // Create object URL for immediate display
      const objectURL = createImageObjectURL(blob);
      setCroppedImage(objectURL);

      // Save to IndexedDB
      await saveImage(blob);
      closeCropModal();
      clearSelection();
    }
  };

  /**
   * Close crop modal without saving
   */
  const handleCloseCropModal = () => {
    closeCropModal();
    clearSelection();
    setCroppedImage(null);
  };

  /**
   * Remove selected/cropped image
   */
  const removeSelectedImage = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    isReplace = false
  ) => {
    if (!isReplace) e.stopPropagation();

    clearSelection();
    setCroppedImage(null);
    await deleteImage();
    destroyCropper();
  };

  /**
   * Trigger file input click
   */
  const handleUploadClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="profile-image-container">
      <div
        className="biodata-profile-picture-wrapper"
        onClick={handleUploadClick}
      >
        <img className="profile-image-wrapper" alt="" src={imageFrameOld} />

        {/* Display cropped image with controls */}
        {displayImage && (
          <>
            <div
              className="replace-photo-btn"
              onClick={(e) => removeSelectedImage(e, true)}
            >
              <ImageIcon />
              {isMobile ? 'Replace' : 'Replace Photo'}
            </div>
            <Tooltip title="Remove the Profile Picture">
              <IconButton
                className="close-btn"
                onClick={(e) => removeSelectedImage(e)}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
            <img
              src={displayImage}
              alt={selectedImage.name || 'Profile Picture'}
              className="biodata-profile-picture"
              style={{ marginBottom: '0' }}
            />
          </>
        )}

        {/* File input */}
        <input
          id="fileInput"
          type="file"
          disabled={showCropModal}
          accept="image/*"
          style={{ display: 'none', cursor: 'not-allowed' }}
          onChange={onFileChange}
          ref={inputRef}
        />

        {/* Upload prompt when no image */}
        {!displayImage && (
          <>
            {isMobile ? (
              <>
                <AddAPhotoIcon
                  sx={{
                    width: '100px',
                    fontSize: '60px',
                    color: '#64728c',
                  }}
                />
                <p>
                  Click here <br />
                  (Up to 20MB only)
                </p>
              </>
            ) : (
              <IconButton
                disableRipple
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '2px',
                  fontSize: '16px',
                  transition:
                    'transform 0.1s ease-in-out, color 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              >
                <AddAPhotoIcon
                  sx={{
                    color: '#5E5E5E',
                    width: '100px',
                    fontSize: '100px',
                  }}
                />
                <p
                  style={{
                    color: '#5E5E5E',
                    fontWeight: 'bold',
                    margin: 0,
                  }}
                >
                  {'Add your photo'.toUpperCase()} <br />
                </p>
              </IconButton>
            )}
          </>
        )}

        {/* Crop Modal */}
        <CustomModal
          show={showCropModal}
          onHide={handleCloseCropModal}
          header={
            <div style={{ margin: '0px 0px 24px 0px' }}>Set Profile Photo</div>
          }
          className="crop-modal"
          body={
            <div onWheel={handleZoom}>
              <Cropper
                style={{
                  height: isMobile ? 228.6 : 400,
                  width: isMobile ? 160 : 280,
                }}
                zoomTo={0.5}
                preview=".img-preview"
                src={selectedImage.file as string}
                minCropBoxHeight={isMobile ? 228.6 : 400}
                minCropBoxWidth={isMobile ? 160 : 280}
                background={false}
                responsive
                onInitialized={initializeCropper}
                cropBoxResizable={false}
                checkOrientation={false}
                guides
              />
            </div>
          }
          primaryButton={
            <PrimaryButton onClick={saveProfilePicture}>
              {isMobile ? 'Save Crop' : 'Save'}
            </PrimaryButton>
          }
          secondaryButton={
            <SecondaryButton onClick={handleCloseCropModal}>
              Close
            </SecondaryButton>
          }
        />

        {/* Error display */}
        {!isFormatValid && uploadError && (
          <div style={{ color: 'red', marginTop: '10px' }}>{uploadError}</div>
        )}
      </div>
    </div>
  );
};

export default AddImage;
