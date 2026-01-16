/**
 * FileInput Component
 * Hidden file input for image upload
 */

import React from 'react';

interface FileInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  inputRef,
  onChange,
  disabled = false,
}) => (
  <input
    id="fileInput"
    type="file"
    disabled={disabled}
    accept="image/*"
    style={{ display: 'none' }}
    onChange={onChange}
    ref={inputRef}
  />
);
