import React, { useState, useRef, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import HeightIcon from '@mui/icons-material/Height';
import { IconButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './CustomHeightPicker.scss';

interface CustomHeightPickerProps {
  key?: number;
  required?: boolean;
  label: string;
  value: string;
  onDelete: () => void;
  onFieldMove: (direction: 'up' | 'down') => void;
  onChange: (value: string) => void;
  error?: boolean;
  errorText?: string;
}

type HeightUnit = 'cm' | 'inches';

const CustomHeightPicker: React.FC<CustomHeightPickerProps> = ({
  key,
  required,
  label,
  onDelete,
  onFieldMove,
  onChange,
  value,
  error,
  errorText,
}) => {
  const formFieldKey = key || uuidv4();
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState<HeightUnit>('cm');
  const [tempCm, setTempCm] = useState('170');
  const [tempFeet, setTempFeet] = useState('5');
  const [tempInches, setTempInches] = useState('7');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const cmScrollRef = useRef<HTMLDivElement>(null);
  const feetScrollRef = useRef<HTMLDivElement>(null);
  const inchesScrollRef = useRef<HTMLDivElement>(null);

  // Generate arrays for options
  const cmOptions = Array.from({ length: 151 }, (_, i) => String(50 + i)); // 50-200
  const feetOptions = Array.from({ length: 5 }, (_, i) => String(3 + i)); // 3-7
  const inchesOptions = Array.from({ length: 12 }, (_, i) => String(i)); // 0-11

  // Conversion functions
  const cmToFeetInches = (cm: string) => {
    const cmValue = parseInt(cm);
    const totalInches = cmValue / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return {
      feet: String(Math.max(3, Math.min(7, feet))),
      inches: String(inches >= 12 ? 0 : inches)
    };
  };

  const feetInchesToCm = (feet: string, inches: string) => {
    const feetValue = parseInt(feet);
    const inchesValue = parseInt(inches);
    const totalInches = (feetValue * 12) + inchesValue;
    const cm = Math.round(totalInches * 2.54);
    return String(Math.max(50, Math.min(200, cm)));
  };

  // Parse the display value
  useEffect(() => {
    if (value) {
      if (value.includes('cm')) {
        setUnit('cm');
        const cm = value.replace(' cm', '');
        setTempCm(cm);
      } else if (value.includes('Feet') || value.includes('Inches')) {
        setUnit('inches');
        const match = value.match(/(\d+)\s*Feet\s*(\d+)\s*Inches?/);
        if (match) {
          setTempFeet(match[1]);
          setTempInches(match[2]);
        }
      }
    }
  }, [value]);

  // Scroll to selected value when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (unit === 'cm' && cmScrollRef.current) {
          const selectedElement = cmScrollRef.current.querySelector('.selected');
          if (selectedElement) {
            selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        } else if (unit === 'inches') {
          if (feetScrollRef.current) {
            const selectedElement = feetScrollRef.current.querySelector('.selected');
            if (selectedElement) {
              selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
          }
          if (inchesScrollRef.current) {
            const selectedElement = inchesScrollRef.current.querySelector('.selected');
            if (selectedElement) {
              selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
          }
        }
      }, 100);
    }
  }, [isOpen, unit]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleOk = () => {
    let heightValue = '';
    if (unit === 'cm') {
      heightValue = `${tempCm} cm`;
    } else {
      heightValue = `${tempFeet} Feet ${tempInches} Inch${tempInches === '1' ? '' : 'es'}`;
    }
    onChange(heightValue);
    setIsOpen(false);
  };

  const handleUnitChange = (newUnit: HeightUnit) => {
    if (newUnit === unit) return;

    if (newUnit === 'cm') {
      // Convert from feet/inches to cm
      const convertedCm = feetInchesToCm(tempFeet, tempInches);
      setTempCm(convertedCm);
    } else {
      // Convert from cm to feet/inches
      const converted = cmToFeetInches(tempCm);
      setTempFeet(converted.feet);
      setTempInches(converted.inches);
    }

    setUnit(newUnit);
  };

  const getDisplayValue = () => {
    if (!value) return 'Select Height';
    return value;
  };

  return (
    <div
      className="flex z-[2]"
      style={{ position: 'relative', zIndex: isOpen ? 10000 : 'auto' }}
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="custom-height-picker-label" htmlFor={String(formFieldKey)}>
          {`${label} ${required ? ' (Required)' : ''}`}
        </label>

        <div className="custom-height-picker-input-wrapper" ref={dropdownRef}>
          <div
            className={`custom-height-picker-input ${error ? 'error' : ''} ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={value ? 'custom-height-picker-value' : 'custom-height-picker-placeholder'}>
              {getDisplayValue()}
            </span>
            <HeightIcon className="custom-height-picker-icon" />
          </div>

          {isOpen && (
            <div className="custom-height-picker-dropdown">
              <div className="custom-height-picker-selectors">
                {unit === 'cm' ? (
                  // CM Mode - Single Column
                  <div className="custom-height-picker-column" ref={cmScrollRef}>
                    {cmOptions.map((cm) => (
                      <div
                        key={cm}
                        className={`custom-height-picker-option ${tempCm === cm ? 'selected' : ''}`}
                        onClick={() => setTempCm(cm)}
                      >
                        {cm}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Inches Mode - Two Columns
                  <>
                    <div className="custom-height-picker-column" ref={feetScrollRef}>
                      {feetOptions.map((feet) => (
                        <div
                          key={feet}
                          className={`custom-height-picker-option ${tempFeet === feet ? 'selected' : ''}`}
                          onClick={() => setTempFeet(feet)}
                        >
                          {feet}
                        </div>
                      ))}
                    </div>
                    <div className="custom-height-picker-column" ref={inchesScrollRef}>
                      {inchesOptions.map((inch) => (
                        <div
                          key={inch}
                          className={`custom-height-picker-option ${tempInches === inch ? 'selected' : ''}`}
                          onClick={() => setTempInches(inch)}
                        >
                          {inch}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Unit Selector - cm/inches */}
                <div className="custom-height-picker-unit">
                  <div
                    className={`custom-height-picker-unit-option ${unit === 'cm' ? 'selected' : ''}`}
                    onClick={() => handleUnitChange('cm')}
                  >
                    cm
                  </div>
                  <div
                    className={`custom-height-picker-unit-option ${unit === 'inches' ? 'selected' : ''}`}
                    onClick={() => handleUnitChange('inches')}
                  >
                    in
                  </div>
                </div>
              </div>

              <div className="custom-height-picker-actions">
                <button
                  className="custom-height-picker-button custom-height-picker-button-cancel"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="custom-height-picker-button custom-height-picker-button-ok"
                  onClick={handleOk}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>

        {error && errorText && (
          <p className="custom-height-picker-error-text">{errorText}</p>
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

export default CustomHeightPicker;
