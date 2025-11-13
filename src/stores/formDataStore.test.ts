import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useFormDataStore } from './formDataStore';

describe('formDataStore', () => {
  // Helper to reset store
  const resetStore = () => {
    const { result } = renderHook(() => useFormDataStore());
    act(() => {
      result.current.setData([]);
      result.current.setDownloadFileName('biodata_file');
    });
  };

  beforeEach(() => {
    resetStore();
  });

  describe('initial state', () => {
    it('should have empty data array initially', () => {
      const { result } = renderHook(() => useFormDataStore());

      expect(result.current.data).toEqual([]);
    });

    it('should have default download filename', () => {
      const { result } = renderHook(() => useFormDataStore());

      expect(result.current.downloadFileName).toBe('biodata_file');
    });
  });

  describe('setData', () => {
    it('should update form data', () => {
      const { result } = renderHook(() => useFormDataStore());

      const testData = [
        {
          id: 1,
          title: 'Personal Information',
          data: [
            {
              id: 1,
              label: 'Full Name',
              value: 'John Doe',
              type: 'string',
              required: true,
            },
          ],
        },
      ];

      act(() => {
        result.current.setData(testData);
      });

      expect(result.current.data).toEqual(testData);
    });
  });

  describe('setDownloadFileName', () => {
    it('should update download filename', () => {
      const { result } = renderHook(() => useFormDataStore());

      act(() => {
        result.current.setDownloadFileName('john_doe_biodata');
      });

      expect(result.current.downloadFileName).toBe('john_doe_biodata');
    });
  });

  describe('persistence across hooks', () => {
    it('should persist data across different hook instances', () => {
      const { result: result1 } = renderHook(() => useFormDataStore());

      const testData = [
        {
          id: 1,
          title: 'Test',
          data: [{ id: 1, label: 'Name', value: 'Test', type: 'string', required: false }],
        },
      ];

      act(() => {
        result1.current.setData(testData);
      });

      // Create new hook instance
      const { result: result2 } = renderHook(() => useFormDataStore());

      expect(result2.current.data).toEqual(testData);
    });
  });
});
