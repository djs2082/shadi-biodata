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
  InputAdornment,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../contexts/LanguageContext';

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
  onBlur?: () => void;
  error?: boolean;
  errorText?: string;
  endAdornment?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  key,
  required,
  label,
  onDelete,
  onFieldMove,
  onChange,
  onBlur,
  value,
  error,
  errorText,
  endAdornment,
}) => {
  const { t } = useLanguage();
  const formFieldKey = key || uuidv4();
  return (
    <div className="flex z-[2]">
      <div className="flex flex-col gap-2 w-full">
        <InputLabel htmlFor="custom-text-field" sx={{ color: '#1a1e3e' }}>
          {`${label}${required ? ` (${t('form.required')})` : ''}`}
        </InputLabel>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            id={`value_${formFieldKey}`}
            placeholder={`${t('form.enter')} ${label}`}
            sx={{
              outline: 'none',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#800000',
                borderWidth: '1px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#800000',
              },
              '&.Mui-focused': {
                outline: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#800000',
                borderWidth: '1.5px',
                boxShadow: '0 0 0 2px rgba(128, 0, 0, 0.1)',
              },
              '& .MuiInputBase-input': {
                color: '#1a1e3e',
                padding: '14px',
                outline: 'none',
                boxShadow: 'none',
              },
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            endAdornment={endAdornment}
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
        <Tooltip title={required ? t('form.cannotDeleteRequired') : ''} arrow>
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
