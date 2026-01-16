import React, { useState, useRef, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton, Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './CustomDatePicker.scss';

interface CustomDatePickerProps {
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

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type ViewMode = 'days' | 'months' | 'years';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>('days');
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor(new Date().getFullYear() / 10) * 10
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse DD-MM-YYYY to Date
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Format Date to DD-MM-YYYY
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);

    const days: Array<{ date: number; isCurrentMonth: boolean; fullDate: Date }> = [];

    // Previous month days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevLastDay.getDate() - i,
        isCurrentMonth: false,
        fullDate: new Date(currentYear, currentMonth - 1, prevLastDay.getDate() - i)
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(currentYear, currentMonth, i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(currentYear, currentMonth + 1, i)
      });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    onChange(formatDate(date));
    setIsOpen(false);
    setViewMode('days');
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
    setViewMode('days');
  };

  const handleYearClick = (year: number) => {
    setCurrentYear(year);
    setViewMode('months');
  };

  const handleMonthYearClick = () => {
    if (viewMode === 'days') {
      setViewMode('months');
    } else if (viewMode === 'months') {
      setViewMode('years');
    }
  };

  const handleToday = () => {
    const today = new Date();
    onChange(formatDate(today));
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setViewMode('days');
    setIsOpen(false);
  };

  const handlePrev = () => {
    if (viewMode === 'days') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (viewMode === 'months') {
      setCurrentYear(currentYear - 1);
    } else if (viewMode === 'years') {
      setYearRangeStart(yearRangeStart - 10);
    }
  };

  const handleNext = () => {
    if (viewMode === 'days') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (viewMode === 'months') {
      setCurrentYear(currentYear + 1);
    } else if (viewMode === 'years') {
      setYearRangeStart(yearRangeStart + 10);
    }
  };

  const handleDoublePrev = () => {
    if (viewMode === 'days') {
      setCurrentYear(currentYear - 1);
    } else if (viewMode === 'months') {
      setCurrentYear(currentYear - 10);
    } else if (viewMode === 'years') {
      setYearRangeStart(yearRangeStart - 100);
    }
  };

  const handleDoubleNext = () => {
    if (viewMode === 'days') {
      setCurrentYear(currentYear + 1);
    } else if (viewMode === 'months') {
      setCurrentYear(currentYear + 10);
    } else if (viewMode === 'years') {
      setYearRangeStart(yearRangeStart + 100);
    }
  };

  const getYearRange = () => {
    const years = [];
    for (let i = yearRangeStart; i < yearRangeStart + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const getHeaderText = () => {
    if (viewMode === 'days') {
      return `${MONTHS[currentMonth]} ${currentYear}`;
    } else if (viewMode === 'months') {
      return `${currentYear}`;
    } else {
      return `${yearRangeStart}-${yearRangeStart + 9}`;
    }
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date): boolean => {
    const selected = parseDate(value);
    if (!selected) return false;
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear();
  };

  const isCurrentMonth = (monthIndex: number): boolean => {
    const today = new Date();
    return monthIndex === today.getMonth() && currentYear === today.getFullYear();
  };

  const isSelectedMonth = (monthIndex: number): boolean => {
    const selected = parseDate(value);
    if (!selected) return false;
    return monthIndex === selected.getMonth() && currentYear === selected.getFullYear();
  };

  const isCurrentYear = (year: number): boolean => {
    return year === new Date().getFullYear();
  };

  const isSelectedYear = (year: number): boolean => {
    const selected = parseDate(value);
    if (!selected) return false;
    return year === selected.getFullYear();
  };

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

  return (
    <div className="flex" style={{ position: 'relative', zIndex: isOpen ? 10000 : 'auto' }}>
      <div className="flex flex-col gap-2 w-full custom-datepicker-container" ref={dropdownRef}>
        <label htmlFor={`date_${formFieldKey}`} className="custom-datepicker-label">
          {`${label} ${required ? ' (Required)' : ''}`}
        </label>

        <div className="custom-datepicker-input-wrapper">
          <input
            id={`date_${formFieldKey}`}
            type="text"
            value={value}
            placeholder="DD/MM/YYYY"
            readOnly
            onClick={() => setIsOpen(!isOpen)}
            className={`custom-datepicker-input ${error ? 'error' : ''}`}
          />
          <CalendarMonthIcon
            className="custom-datepicker-icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {error && errorText && (
          <span className="custom-datepicker-error">{errorText}</span>
        )}

        {isOpen && (
          <div className="custom-datepicker-dropdown">
            <div className="custom-datepicker-header">
              <IconButton size="small" onClick={handleDoublePrev}>
                <KeyboardDoubleArrowLeftIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handlePrev}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <span
                className="custom-datepicker-month-year"
                onClick={handleMonthYearClick}
                style={{ cursor: 'pointer' }}
              >
                {getHeaderText()}
              </span>
              <IconButton size="small" onClick={handleNext}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleDoubleNext}>
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              </IconButton>
            </div>

            {/* Days View */}
            {viewMode === 'days' && (
              <>
                <div className="custom-datepicker-days-header">
                  {DAYS.map((day) => (
                    <div key={day} className="custom-datepicker-day-name">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="custom-datepicker-days-grid">
                  {getCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      className={`custom-datepicker-day ${
                        !day.isCurrentMonth ? 'other-month' : ''
                      } ${isToday(day.fullDate) ? 'today' : ''} ${
                        isSelected(day.fullDate) ? 'selected' : ''
                      }`}
                      onClick={() => handleDateClick(day.fullDate)}
                    >
                      {day.date}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Months View */}
            {viewMode === 'months' && (
              <div className="custom-datepicker-months-grid">
                {MONTHS.map((month, index) => (
                  <div
                    key={month}
                    className={`custom-datepicker-month ${
                      isCurrentMonth(index) ? 'current' : ''
                    } ${isSelectedMonth(index) ? 'selected' : ''}`}
                    onClick={() => handleMonthClick(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}

            {/* Years View */}
            {viewMode === 'years' && (
              <div className="custom-datepicker-years-grid">
                {getYearRange().map((year) => (
                  <div
                    key={year}
                    className={`custom-datepicker-year ${
                      isCurrentYear(year) ? 'current' : ''
                    } ${isSelectedYear(year) ? 'selected' : ''}`}
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}

            <div className="custom-datepicker-footer">
              <button
                className="custom-datepicker-today-btn"
                onClick={handleToday}
              >
                Today
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
        <Tooltip title={required ? 'Cannot Delete Required Field' : null} arrow>
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

export default CustomDatePicker;
