import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { useState } from 'react';

import { useFormData } from '../../../hooks/useFormData';
import PrimaryButton from '../../atoms/PrimaryButton';
import SecondaryButton from '../../atoms/SecondaryButton';
import CustomModal from '../../molecules/Modals/Modal';

const AddExtraFieldForm = () => {
  const { showAddNewFieldForm, addFormField, hideAddFieldForm } = useFormData();

  const [extraFieldLabel, setExtraFieldLabel] = useState<string>('');
  const [extraFieldValue, setExtraFieldValue] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isError = (value: string) => submitted && value.length === 0;

  const handleClose = () => {
    setExtraFieldLabel('');
    setExtraFieldValue('');
    setSubmitted(false);
    hideAddFieldForm();
  };

  const handleSave = () => {
    if (extraFieldLabel.length === 0 || extraFieldValue.length === 0) {
      setSubmitted(true);
      return;
    }
    addFormField(extraFieldLabel, extraFieldValue);
    setExtraFieldLabel('');
    setExtraFieldValue('');
    setSubmitted(false);
  };

  return (
    <CustomModal
      show={showAddNewFieldForm}
      onHide={handleClose}
      header={<div>Enter Field Name and Value</div>}
      body={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '16px',
            width: '100%',
          }}
        >
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <OutlinedInput
              id="extra_field_label"
              placeholder="Enter Field Name"
              sx={{
                '& .MuiInputBase-input': {
                  color: '#1a1e3e',
                },
              }}
              onChange={(e) => setExtraFieldLabel(e.target.value)}
              value={extraFieldLabel}
              error={isError(extraFieldLabel)}
            />
            {isError(extraFieldLabel) && (
              <FormHelperText error>Label is Required</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <OutlinedInput
              id="extra_field_value"
              placeholder="Enter Field Value"
              sx={{
                '& .MuiInputBase-input': {
                  color: '#1a1e3e',
                },
              }}
              onChange={(e) => setExtraFieldValue(e.target.value)}
              value={extraFieldValue}
              error={isError(extraFieldValue)}
            />
            {isError(extraFieldValue) && (
              <FormHelperText error>Value is Required</FormHelperText>
            )}
          </FormControl>
        </div>
      }
      primaryButton={<PrimaryButton onClick={handleSave}>Save</PrimaryButton>}
      secondaryButton={
        <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
      }
    />
  );
};

export default AddExtraFieldForm;
