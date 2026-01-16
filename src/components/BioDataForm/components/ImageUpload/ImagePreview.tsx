/**
 * ImagePreview Component
 * Displays the uploaded/cropped image
 */

import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="biodata-profile-picture" />
);
