import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, InputLabel, Tooltip, FormHelperText } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';

// Enable custom time parsing
dayjs.extend(customParseFormat);

interface TimePickerFieldProps {
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

const TimePickerField: React.FC<TimePickerFieldProps> = ({
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

  // Parse the time value (supports various formats like "11:59 AM", "14:30")
  const parseTime = (timeString: string): Dayjs | null => {
    if (!timeString) return null;

    // Try parsing various time formats
    const formats = [
      'h:mm A',    // 11:59 AM
      'hh:mm A',   // 11:59 AM
      'H:mm',      // 14:30
      'HH:mm',     // 14:30
    ];

    for (const format of formats) {
      const parsed = dayjs(timeString, format, true);
      if (parsed.isValid()) return parsed;
    }

    // Fallback to default parsing
    return dayjs(timeString).isValid() ? dayjs(timeString) : null;
  };

  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      // Format as 12-hour time with AM/PM
      onChange(newValue.format('h:mm A'));
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex z-[2]">
      <div className="flex flex-col gap-2 w-full">
        <InputLabel htmlFor={`time_${formFieldKey}`} sx={{ color: '#1a1e3e' }}>
          {`${label} ${required ? ' (Required)' : ''}`}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={parseTime(value)}
            onChange={handleTimeChange}
            slotProps={{
              textField: {
                id: `time_${formFieldKey}`,
                placeholder: 'Select time',
                error: error,
                helperText: error ? errorText : '',
                sx: {
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#800000',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#800000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#800000',
                      borderWidth: '1.5px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#1a1e3e',
                    border: 'none !important',
                    borderLeft: 'none !important',
                    borderRight: 'none !important',
                    '&::before': {
                      display: 'none',
                    },
                    '&::after': {
                      display: 'none',
                    },
                  },
                  '& .MuiInputAdornment-root': {
                    marginLeft: 0,
                  },
                  '& input': {
                    border: 'none !important',
                    borderLeft: 'none !important',
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        {error && !errorText && <FormHelperText error>{errorText}</FormHelperText>}
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

export default TimePickerField;
