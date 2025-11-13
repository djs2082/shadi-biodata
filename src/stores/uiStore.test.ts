import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useUIStore } from './uiStore';

describe('uiStore', () => {
  // Helper to reset store
  const resetStore = () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.setShowAddNewFieldForm(false);
      result.current.setExtraFieldAddGroupId(null);
      result.current.setTodaysBiodataCount(0);
      result.current.setCroppedImage(null);
    });
  };

  beforeEach(() => {
    resetStore();
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.showAddNewFieldForm).toBe(false);
      expect(result.current.extraFieldAddGroupId).toBeNull();
      expect(result.current.todaysBiodataCount).toBe(0);
      expect(result.current.croppedImage).toBeNull();
    });
  });

  describe('setShowAddNewFieldForm', () => {
    it('should update showAddNewFieldForm state', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setShowAddNewFieldForm(true);
      });

      expect(result.current.showAddNewFieldForm).toBe(true);

      act(() => {
        result.current.setShowAddNewFieldForm(false);
      });

      expect(result.current.showAddNewFieldForm).toBe(false);
    });
  });

  describe('setExtraFieldAddGroupId', () => {
    it('should update extraFieldAddGroupId state', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setExtraFieldAddGroupId(5);
      });

      expect(result.current.extraFieldAddGroupId).toBe(5);

      act(() => {
        result.current.setExtraFieldAddGroupId(null);
      });

      expect(result.current.extraFieldAddGroupId).toBeNull();
    });
  });

  describe('setTodaysBiodataCount', () => {
    it('should update todays biodata count', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setTodaysBiodataCount(42);
      });

      expect(result.current.todaysBiodataCount).toBe(42);
    });
  });

  describe('setCroppedImage', () => {
    it('should update cropped image URL', () => {
      const { result } = renderHook(() => useUIStore());

      const mockImageUrl = 'blob:http://localhost/image-123';

      act(() => {
        result.current.setCroppedImage(mockImageUrl);
      });

      expect(result.current.croppedImage).toBe(mockImageUrl);

      act(() => {
        result.current.setCroppedImage(null);
      });

      expect(result.current.croppedImage).toBeNull();
    });
  });

  describe('persistence across hooks', () => {
    it('should persist state across different hook instances', () => {
      const { result: result1 } = renderHook(() => useUIStore());

      act(() => {
        result1.current.setTodaysBiodataCount(100);
        result1.current.setShowAddNewFieldForm(true);
      });

      // Create new hook instance
      const { result: result2 } = renderHook(() => useUIStore());

      expect(result2.current.todaysBiodataCount).toBe(100);
      expect(result2.current.showAddNewFieldForm).toBe(true);
    });
  });
});
