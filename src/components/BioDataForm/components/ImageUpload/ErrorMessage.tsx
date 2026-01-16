/**
 * ErrorMessage Component
 * Displays upload error messages
 */

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="upload-error">{message}</div>
);
