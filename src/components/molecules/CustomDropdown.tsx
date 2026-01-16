import React, { useState, useRef, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../contexts/LanguageContext';
import './CustomDropdown.scss';

interface CustomDropdownProps {
  key?: number;
  required?: boolean;
  label: string;
  value: string;
  options: string[] | { label: string; value: string }[];
  onDelete: () => void;
  onFieldMove: (direction: 'up' | 'down') => void;
  onChange: (value: string) => void;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  key,
  required,
  label,
  onDelete,
  onFieldMove,
  onChange,
  value,
  options,
  error,
  errorText,
  placeholder,
}) => {
  const { t } = useLanguage();
  const formFieldKey = key || uuidv4();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const defaultPlaceholder = placeholder || t('form.selectOption');

  // Normalize options to always work with { label, value } format
  const normalizedOptions = options.map((option) => {
    if (typeof option === 'string') {
      return { label: option, value: option };
    }
    return option;
  });

  // Get display text for selected value
  const getDisplayText = () => {
    if (!value) return defaultPlaceholder;
    const selectedOption = normalizedOptions.find((opt) => opt.value === value);
    return selectedOption ? selectedOption.label : value;
  };

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

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div
      className="flex z-[2]"
      style={{ position: 'relative', zIndex: isOpen ? 10000 : 'auto' }}
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="custom-dropdown-label" htmlFor={String(formFieldKey)}>
          {`${label}${required ? ` (${t('form.required')})` : ''}`}
        </label>

        <div className="custom-dropdown-input-wrapper" ref={dropdownRef}>
          <div
            className={`custom-dropdown-input ${error ? 'error' : ''} ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={
                value ? 'custom-dropdown-value' : 'custom-dropdown-placeholder'
              }
            >
              {getDisplayText()}
            </span>
            <KeyboardArrowDownIcon
              className={`custom-dropdown-arrow ${isOpen ? 'open' : ''}`}
            />
          </div>

          {isOpen && (
            <div className="custom-dropdown-menu">
              {normalizedOptions.length === 0 ? (
                <div className="custom-dropdown-option disabled">
                  No options available
                </div>
              ) : (
                normalizedOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`custom-dropdown-option ${value === option.value ? 'selected' : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {error && errorText && (
          <p className="custom-dropdown-error-text">{errorText}</p>
        )}
      </div>

      <div className="form-move-arrows">
        <IconButton onClick={() => onFieldMove('up')}>
          <ArrowDropUpIcon fontSize="large" sx={{ color: '#DAA520' }} />
        </IconButton>
        <IconButton onClick={() => onFieldMove('down')}>
          <ArrowDropDownIcon fontSize="large" sx={{ color: '#DAA520' }} />
        </IconButton>
      </div>

      <div className="form-field-delete-icon">
        <IconButton onClick={onDelete}>
          <DeleteIcon fontSize="large" sx={{ color: 'rgb(235, 119, 117)' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default CustomDropdown;
