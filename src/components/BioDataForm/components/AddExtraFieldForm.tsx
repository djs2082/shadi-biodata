import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { useState } from 'react';

import PrimaryButton from '../../UtilComponents/Buttons/PrimaryButton';
import SecondaryButton from '../../UtilComponents/Buttons/SecondaryButton';
import CustomModal from '../../UtilComponents/Modals/Modal';
import useBioDataFormViewModel from '../viewModel';

const AddExtraFieldForm = () => {
  const viewModel = useBioDataFormViewModel();

  const [extraFieldLabel, setExtraFieldLabel] = useState<string>('');
  const [extraFieldValue, setExtraFieldValue] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isError = (value: string) => submitted && value.length === 0;

  return (
    <CustomModal
      show={viewModel.getShowExtraFieldForm()}
      onHide={() => {
        setExtraFieldLabel('');
        setExtraFieldValue('');
        setSubmitted(false);
        viewModel.hideExtraFieldForm();
      }}
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
      primaryButton={
        <PrimaryButton
          onClick={() => {
            if (extraFieldLabel.length === 0 || extraFieldValue.length === 0) {
              setSubmitted(true);
              return;
            }
            viewModel.addFormField(extraFieldLabel, extraFieldValue);
          }}
        >
          Save
        </PrimaryButton>
      }
      secondaryButton={
        <SecondaryButton
          onClick={() => {
            setSubmitted(false);
            viewModel.hideExtraFieldForm();
          }}
        >
          Cancel
        </SecondaryButton>
      }
    />
  );
};

export default AddExtraFieldForm;
