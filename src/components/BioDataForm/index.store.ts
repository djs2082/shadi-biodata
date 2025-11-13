import { create } from 'zustand';
import { FormDataFieldGorup, FormDataFields } from './model';

export type BioDataFormDataStore = {
  showLoader: boolean;
  setShowLoader: (show: boolean) => void;
  data: FormDataFieldGorup[];
  setData: (data: FormDataFieldGorup[]) => void;
  todaysBiodataCount: number;
  setTodaysBiodataCount: (count: number) => void;
  extraFieldAddGroupId: number | null;
  setExtraFieldAddGroupId: (id: number | null) => void;
  showAddNewFieldForm: boolean;
  setShowAddNewFieldForm: (show: boolean) => void;
  downloadFileName: string;
  setDownloadFileName: (name: string) => void;
  showImageCropModal: boolean;
  setShowImageCropModal: (show: boolean) => void;
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
  croppedImageUrl: string | null;
  setCroppedImageUrl: (image: string | null) => void;
};

const useBioDataFormDataStore = create<BioDataFormDataStore>((set) => ({
  showLoader: false,
  setShowLoader: (show) => set({ showLoader: show }),
  data: FormDataFields,
  setData: (data) => set({ data }),
  todaysBiodataCount: 0,
  setTodaysBiodataCount: (count) => set({ todaysBiodataCount: count }),
  extraFieldAddGroupId: null,
  setExtraFieldAddGroupId: (id: number | null) =>
    set({ extraFieldAddGroupId: id }),
  showAddNewFieldForm: false,
  setShowAddNewFieldForm: (show) => set({ showAddNewFieldForm: show }),
  downloadFileName: 'biodata_file',
  setDownloadFileName: (name) => set({ downloadFileName: name }),
  showImageCropModal: false,
  setShowImageCropModal: (show) => set({ showImageCropModal: show }),
  croppedImage: null,
  setCroppedImage: (image) => set({ croppedImage: image }),
  croppedImageUrl: null,
  setCroppedImageUrl: (image: string | null) => set({ croppedImageUrl: image }),
}));

export default useBioDataFormDataStore;
