import {
  FormControl,
  IconButton,
  OutlinedInput,
  // TextField,
  InputLabel,
  Tooltip,
  FormHelperText,
} from '@mui/material';
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
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
        {/* <TextField
          id={`label_${formFieldKey}`}
          label={required ? `${label} ${required ? "(Required)" : ""}` : ""}
          placeholder={required ? "" : `Enter ${label} Name`}
          variant="outlined"
          disabled={required}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            width: "100%",
            "& .MuiInputLabel-root": {
              color: "#1a1e3e",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1a1e3e",
            },
            "& .MuiInputBase-root.Mui-disabled": {
              backgroundColor: "#f0f0f0", // Change the background color here
            },
          }}
          // sx={{ width: "100%" }}
        /> */}
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
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              id="dob-input"
              label="Date of Birth"
              inputFormat="MM/dd/yyyy"
              value={new Date("14-10-1997")}
              onChange={() => {}}
              renderInput={(params: any) => <OutlinedInput {...params} />}
            />
          </LocalizationProvider> */}
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
