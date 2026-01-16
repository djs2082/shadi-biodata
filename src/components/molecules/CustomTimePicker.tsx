/**
 * CustomTimePicker Component
 * Custom time picker with 12-hour format and AM/PM selector
 */

import React, { useState, useRef, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton, Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../contexts/LanguageContext';
import './CustomTimePicker.scss';

interface CustomTimePickerProps {
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

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
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
  const { t } = useLanguage();
  const formFieldKey = key || uuidv4();
  const [isOpen, setIsOpen] = useState(false);
  const [tempHour, setTempHour] = useState('12');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempPeriod, setTempPeriod] = useState<'AM' | 'PM'>('AM');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  // Generate arrays for hours (1-12) and minutes (00-59)
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  // Parse time value (format: "h:mm A" e.g., "11:59 AM")
  const parseTime = (
    timeStr: string
  ): { hour: string; minute: string; period: 'AM' | 'PM' } | null => {
    if (!timeStr) return null;
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return {
        hour: match[1].padStart(2, '0'),
        minute: match[2],
        period: match[3].toUpperCase() as 'AM' | 'PM',
      };
    }
    return null;
  };

  // Format time to "h:mm A"
  const formatTime = (
    hour: string,
    minute: string,
    period: 'AM' | 'PM'
  ): string => {
    const hourNum = parseInt(hour, 10);
    return `${hourNum}:${minute} ${period}`;
  };

  // Update temp values when value changes
  useEffect(() => {
    const parsed = parseTime(value);
    if (parsed) {
      setTempHour(parsed.hour);
      setTempMinute(parsed.minute);
      setTempPeriod(parsed.period);
    }
  }, [value]);

  // Scroll selected item into view when dropdown opens
  useEffect(() => {
    if (isOpen && hourScrollRef.current && minuteScrollRef.current) {
      const hourIndex = hours.indexOf(tempHour);
      const minuteIndex = minutes.indexOf(tempMinute);

      if (hourIndex !== -1) {
        const hourElement = hourScrollRef.current.children[
          hourIndex
        ] as HTMLElement;
        if (hourElement) {
          hourScrollRef.current.scrollTop =
            hourElement.offsetTop - hourScrollRef.current.offsetTop;
        }
      }

      if (minuteIndex !== -1) {
        const minuteElement = minuteScrollRef.current.children[
          minuteIndex
        ] as HTMLElement;
        if (minuteElement) {
          minuteScrollRef.current.scrollTop =
            minuteElement.offsetTop - minuteScrollRef.current.offsetTop;
        }
      }
    }
  }, [isOpen, tempHour, tempMinute, hours, minutes]);

  const handleOk = () => {
    onChange(formatTime(tempHour, tempMinute, tempPeriod));
    setIsOpen(false);
  };

  const handleNow = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    const period: 'AM' | 'PM' = hour >= 12 ? 'PM' : 'AM';

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    const hourStr = String(hour).padStart(2, '0');
    setTempHour(hourStr);
    setTempMinute(minute);
    setTempPeriod(period);

    onChange(formatTime(hourStr, minute, period));
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset to current value
    const parsed = parseTime(value);
    if (parsed) {
      setTempHour(parsed.hour);
      setTempMinute(parsed.minute);
      setTempPeriod(parsed.period);
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, value]);

  return (
    <div className="flex" style={{ position: 'relative', zIndex: isOpen ? 10000 : 'auto' }}>
      <div
        className="flex flex-col gap-2 w-full custom-timepicker-container"
        ref={dropdownRef}
      >
        <label
          htmlFor={`time_${formFieldKey}`}
          className="custom-timepicker-label"
        >
          {`${label}${required ? ` (${t('form.required')})` : ''}`}
        </label>

        <div className="custom-timepicker-input-wrapper">
          <input
            id={`time_${formFieldKey}`}
            type="text"
            value={value}
            placeholder={t('form.selectTime')}
            readOnly
            onClick={() => setIsOpen(!isOpen)}
            className={`custom-timepicker-input ${error ? 'error' : ''}`}
          />
          <AccessTimeIcon
            className="custom-timepicker-icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {error && errorText && (
          <span className="custom-timepicker-error">{errorText}</span>
        )}

        {isOpen && (
          <div className="custom-timepicker-dropdown">
            <div className="custom-timepicker-selectors">
              {/* Hour Selector */}
              <div className="custom-timepicker-column" ref={hourScrollRef}>
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className={`custom-timepicker-option ${
                      tempHour === hour ? 'selected' : ''
                    }`}
                    onClick={() => setTempHour(hour)}
                  >
                    {hour}
                  </div>
                ))}
              </div>

              {/* Minute Selector */}
              <div className="custom-timepicker-column" ref={minuteScrollRef}>
                {minutes.map((minute) => (
                  <div
                    key={minute}
                    className={`custom-timepicker-option ${
                      tempMinute === minute ? 'selected' : ''
                    }`}
                    onClick={() => setTempMinute(minute)}
                  >
                    {minute}
                  </div>
                ))}
              </div>

              {/* AM/PM Selector */}
              <div className="custom-timepicker-period">
                <div
                  className={`custom-timepicker-period-option ${
                    tempPeriod === 'AM' ? 'selected' : ''
                  }`}
                  onClick={() => setTempPeriod('AM')}
                >
                  AM
                </div>
                <div
                  className={`custom-timepicker-period-option ${
                    tempPeriod === 'PM' ? 'selected' : ''
                  }`}
                  onClick={() => setTempPeriod('PM')}
                >
                  PM
                </div>
              </div>
            </div>

            <div className="custom-timepicker-footer">
              <button className="custom-timepicker-now-btn" onClick={handleNow}>
                {t('form.now')}
              </button>
              <button className="custom-timepicker-ok-btn" onClick={handleOk}>
                {t('buttons.ok')}
              </button>
            </div>
          </div>
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
        <Tooltip title={required ? t('form.cannotDeleteRequired') : ''} arrow>
          <IconButton
            sx={{
              cursor: required ? 'not-allowed' : 'pointer',
              '&.Mui-disabled': {
                cursor: 'not-allowed',
              },
            }}
            onClick={() => (required ? '' : onDelete())}
          >
            <DeleteIcon fontSize="large" sx={{ color: 'rgb(235, 119, 117)' }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default CustomTimePicker;
