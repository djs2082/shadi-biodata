/**
 * UploadPrompt Component
 * Displays the upload prompt UI with icon and text
 */

import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const UploadPrompt: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="upload-prompt">
      <div className="upload-icon-wrapper">
        <ImageIcon className="upload-icon" />
        <div className="upload-icon-plus">+</div>
      </div>
      <p className="upload-text">{t('form.clickToAddPhoto')}</p>
      <p className="upload-subtext">{t('form.photoSizeLimit')}</p>
    </div>
  );
};
