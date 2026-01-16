import { useRef, useState } from 'react';

import { validateImageFile } from '../utils/imageValidator';

export interface SelectedImage {
  file: string | null;
  name: string | null;
  size: number | null;
  type: string | null;
}

/**
 * Custom hook for handling image file upload and validation
 * Manages file input, validation, and selected image state
 */
export const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    file: null,
    name: null,
    size: null,
    type: null,
  });
  const [isFormatValid, setIsFormatValid] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection from input
   * @param event - File input change event
   * @returns Promise resolving to validation result
   */
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<boolean> => {
    event.preventDefault();
    const files = event.target.files;

    if (!files || !files[0]) {
      return false;
    }

    const file = files[0];

    try {
      // Validate file
      const validation = await validateImageFile(file);

      if (!validation.valid) {
        setIsFormatValid(false);
        setUploadError(validation.error || 'Invalid file');
        setTimeout(() => {
          setIsFormatValid(true);
          setUploadError(null);
        }, 2000);
        return false;
      }

      // Read file as data URL for preview - wrap in Promise to wait for completion
      return new Promise<boolean>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          setSelectedImage({
            file: e.target?.result as string,
            name: file.name,
            size: file.size,
            type: validation.mimeType?.mime || file.type,
          });
          setUploadError(null);
          resolve(true);
        };

        reader.onerror = () => {
          setUploadError('Failed to read file');
          resolve(false);
        };

        reader.readAsDataURL(file);
      });
    } catch (error) {
      setUploadError('Failed to process file');
      return false;
    }
  };

  /**
   * Clear selected image and reset input
   */
  const clearSelection = () => {
    setSelectedImage({
      file: null,
      name: null,
      size: null,
      type: null,
    });
    setUploadError(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  /**
   * Trigger file input click programmatically
   */
  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return {
    selectedImage,
    isFormatValid,
    uploadError,
    inputRef,
    handleFileSelect,
    clearSelection,
    triggerFileInput,
  };
};
