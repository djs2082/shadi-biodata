import React, { useState, useRef, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSelector.scss';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = async (langCode: string) => {
    await changeLanguage(langCode as any);
    setIsOpen(false);
  };

  return (
    <div
      className="language-selector"
      ref={dropdownRef}
      style={{ zIndex: isOpen ? 10000 : 1000 }}
    >
      <div
        className={`language-selector-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <LanguageIcon className="language-icon" />
        <span className="language-label">
          {supportedLanguages[currentLanguage as keyof typeof supportedLanguages]}
        </span>
        <KeyboardArrowDownIcon
          className={`arrow-icon ${isOpen ? 'open' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="language-selector-dropdown">
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <div
              key={code}
              className={`language-option ${currentLanguage === code ? 'selected' : ''}`}
              onClick={() => handleLanguageChange(code)}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
