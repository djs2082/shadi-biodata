import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  Tooltip,
  FormHelperText,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './index.scss';

interface FormFieldProps {
  key?: number;
  required?: boolean;
  label: string;
  value: string;
  onDelete: () => void;
  onFieldMove: (direction: 'up' | 'down') => void;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  error?: boolean;
  errorText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
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
  return (
    <div className="form-field-wrapper">
      <div className="form-fields">
        <InputLabel htmlFor="custom-text-field" sx={{ color: '#1a1e3e' }}>
          {`${label} ${required ? ' (Required)' : ''}`}
        </InputLabel>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            id={`value_${formFieldKey}`}
            placeholder={required ? `Enter ${label}` : `Enter ${label}`}
            sx={{
              '& .MuiInputBase-input': {
                color: '#1a1e3e',
                border: '1px solid #800000',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#800000', // Change border color on focus (Gold)
                borderWidth: '1.5px', // Optional: thicker border on focus
              },
            }}
            value={value}
            onChange={onChange}
            error={error}
          />
          {error && <FormHelperText error>{errorText}</FormHelperText>}
        </FormControl>
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
              cursor: required ? 'not-allowed' : 'pointer', // Apply `not-allowed` cursor when disabled
              '&.Mui-disabled': {
                cursor: 'not-allowed', // Override default pointer cursor when disabled
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

export default FormField;
