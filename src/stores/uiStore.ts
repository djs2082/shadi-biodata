import { create } from 'zustand';

/**
 * UI State Store
 * Manages global UI state like modal visibility and selected items
 */
interface UIStore {
  // Extra field form state
  showAddNewFieldForm: boolean;
  setShowAddNewFieldForm: (show: boolean) => void;
  extraFieldAddGroupId: number | null;
  setExtraFieldAddGroupId: (id: number | null) => void;

  // Biodata count
  todaysBiodataCount: number;
  setTodaysBiodataCount: (count: number) => void;

  // Image state (synced with viewModel for now, will migrate to hooks)
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  showAddNewFieldForm: false,
  setShowAddNewFieldForm: (show) => set({ showAddNewFieldForm: show }),
  extraFieldAddGroupId: null,
  setExtraFieldAddGroupId: (id) => set({ extraFieldAddGroupId: id }),
  todaysBiodataCount: 0,
  setTodaysBiodataCount: (count) => set({ todaysBiodataCount: count }),
  croppedImage: null,
  setCroppedImage: (image) => set({ croppedImage: image }),
}));
