/**
 * ImageControls Component
 * Replace and Remove buttons for uploaded images
 */

import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton, Tooltip } from '@mui/material';

interface ImageControlsProps {
  onReplace: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
  isMobile: boolean;
}

export const ImageControls: React.FC<ImageControlsProps> = ({
  onReplace,
  onRemove,
  isMobile,
}) => (
  <>
    <Tooltip title="Replace Photo">
      <div className="replace-photo-btn" onClick={onReplace}>
        <ImageIcon fontSize="small" />
        <span>{isMobile ? 'Replace' : 'Replace Photo'}</span>
      </div>
    </Tooltip>
    <Tooltip title="Remove Photo">
      <IconButton className="close-btn" onClick={onRemove} size="small">
        <CloseOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </>
);
