import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  addImageToDB,
  deleteImageFromDB,
  getImageFromDB,
} from '../services/indexedDB';
import { resizeImage } from '../utils/imageResizer';

/**
 * Custom hook for managing image storage in IndexedDB
 * Handles loading, saving, and deleting profile pictures
 */
export const useImageStorage = () => {
  const [storedImage, setStoredImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load image from IndexedDB on mount
   */
  useEffect(() => {
    const loadStoredImage = async () => {
      try {
        setIsLoading(true);
        const result = await getImageFromDB();

        if (result) {
          // Resize for display
          const resizedBlob = await resizeImage(result, 800, 600, 0.7);
          if (resizedBlob) {
            const objectURL = URL.createObjectURL(resizedBlob);
            setStoredImage(objectURL);
          }
        }
      } catch (err) {
        setError('Failed to load image from storage');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredImage();

    // Cleanup object URL on unmount
    return () => {
      if (storedImage) {
        URL.revokeObjectURL(storedImage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Save a new image to IndexedDB
   * @param blob - Image blob to save
   */
  const saveImage = async (blob: Blob): Promise<boolean> => {
    try {
      const id = uuidv4();
      await addImageToDB(id, blob);

      // Create display URL from resized version
      const resizedBlob = await resizeImage(blob, 800, 600, 0.7);
      if (resizedBlob) {
        // Revoke old URL if exists
        if (storedImage) {
          URL.revokeObjectURL(storedImage);
        }

        const objectURL = URL.createObjectURL(resizedBlob);
        setStoredImage(objectURL);
      }

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to save image to storage');
      return false;
    }
  };

  /**
   * Delete the stored image from IndexedDB
   */
  const deleteImage = async (): Promise<boolean> => {
    try {
      await deleteImageFromDB();

      // Revoke object URL
      if (storedImage) {
        URL.revokeObjectURL(storedImage);
        setStoredImage(null);
      }

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete image from storage');
      return false;
    }
  };

  return {
    storedImage,
    isLoading,
    error,
    saveImage,
    deleteImage,
  };
};
