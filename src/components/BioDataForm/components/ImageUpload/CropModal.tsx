/**
 * CropModal Component
 * Modal for cropping uploaded images
 */

import React from 'react';
import 'cropperjs/dist/cropper.css';
// eslint-disable-next-line import/no-named-as-default
import Cropper from 'react-cropper';
import { getAspectRatioDimensions } from '../../../../services/imageUploadService';
import PrimaryButton from '../../../atoms/PrimaryButton';
import SecondaryButton from '../../../atoms/SecondaryButton';
import CustomModal from '../../../molecules/Modals/Modal';

interface CropModalProps {
  show: boolean;
  imageSource: string;
  onClose: () => void;
  onSave: () => void;
  onZoom: (e: React.WheelEvent) => void;
  onInitialize: (instance: Cropper) => void;
  isMobile: boolean;
}

export const CropModal: React.FC<CropModalProps> = ({
  show,
  imageSource,
  onClose,
  onSave,
  onZoom,
  onInitialize,
  isMobile,
}) => {
  const dimensions = getAspectRatioDimensions(isMobile);

  return (
    <CustomModal
      show={show}
      onHide={onClose}
      header={
        <div style={{ margin: '0px 0px 24px 0px' }}>Set Profile Photo</div>
      }
      className="crop-modal"
      body={
        <div onWheel={onZoom}>
          <Cropper
            style={dimensions}
            zoomTo={0.5}
            preview=".img-preview"
            src={imageSource}
            minCropBoxHeight={dimensions.height}
            minCropBoxWidth={dimensions.width}
            background={false}
            responsive
            onInitialized={onInitialize}
            cropBoxResizable={false}
            checkOrientation={false}
            guides
          />
        </div>
      }
      primaryButton={
        <PrimaryButton onClick={onSave}>
          {isMobile ? 'Save Crop' : 'Save'}
        </PrimaryButton>
      }
      secondaryButton={<SecondaryButton onClick={onClose}>Close</SecondaryButton>}
    />
  );
};
