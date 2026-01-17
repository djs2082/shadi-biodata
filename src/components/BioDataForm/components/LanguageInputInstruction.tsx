import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './LanguageInputInstruction.scss';

interface LanguageInputInstructionProps {
  currentLanguage: string;
}

const LanguageInputInstruction: React.FC<LanguageInputInstructionProps> = ({ currentLanguage }) => {
  // Don't show instruction for English
  if (currentLanguage === 'en') {
    return null;
  }

  const handleOpenGoogleInputTools = () => {
    window.open('https://www.google.com/inputtools/try/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="language-input-instruction">
      <div className="instruction-header">
        <InfoIcon className="info-icon" />
        <span className="instruction-title">Language Input Helper</span>
      </div>
      <div className="instruction-content">
        <p>
          To type in your selected language, use{' '}
          <button
            className="google-input-link"
            onClick={handleOpenGoogleInputTools}
            type="button"
          >
            Google Input Tools
            <OpenInNewIcon className="external-icon" />
          </button>
        </p>
        <p className="instruction-note">
          Type your text (name, place, etc.) in Google Input Tools, then copy and paste it into the form fields below.
        </p>
      </div>
    </div>
  );
};

export default LanguageInputInstruction;
