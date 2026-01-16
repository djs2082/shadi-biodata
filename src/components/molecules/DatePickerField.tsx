import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, InputLabel, Tooltip, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
import { TextField, InputAdornment } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Enable custom date parsing
dayjs.extend(customParseFormat);

interface DatePickerFieldProps {
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

const DatePickerField: React.FC<DatePickerFieldProps> = ({
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

  // Parse the date value (supports DD-MM-YYYY format)
  const parseDate = (dateString: string): Dayjs | null => {
    if (!dateString) return null;
    // Try parsing DD-MM-YYYY format first
    const parsed = dayjs(dateString, 'DD-MM-YYYY', true);
    if (parsed.isValid()) return parsed;
    // Fallback to default parsing
    return dayjs(dateString).isValid() ? dayjs(dateString) : null;
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      // Format as DD-MM-YYYY
      onChange(newValue.format('DD-MM-YYYY'));
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex z-[2]">
      <div className="flex flex-col gap-2 w-full">
        <InputLabel htmlFor={`date_${formFieldKey}`} sx={{ color: '#1a1e3e' }}>
          {`${label} ${required ? ' (Required)' : ''}`}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={parseDate(value)}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="DD/MM/YYYY"
                  error={error}
                  helperText={error ? errorText : ''}
                  InputProps={{
                    ...params.InputProps,

                    /* 👇 FULL CONTROL — NO MUI DIVIDER */
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton tabIndex={-1}>
                          <CalendarMonthIcon sx={{ color: '#1a1e3e' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',

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
                      padding: '14px',
                      color: '#1a1e3e',
                    },
                  }}
                />
              ),
            }}
          />
        </LocalizationProvider>

        {error && !errorText && (
          <FormHelperText error>{errorText}</FormHelperText>
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

export default DatePickerField;
