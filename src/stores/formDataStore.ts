import { create } from 'zustand';

import { FormDataFieldGorup } from '../components/BioDataForm/model';

/**
 * Form Data Store
 * Manages the biodata form field groups and their data
 */
interface FormDataStore {
  data: FormDataFieldGorup[];
  setData: (data: FormDataFieldGorup[]) => void;
  downloadFileName: string;
  setDownloadFileName: (name: string) => void;
}

export const useFormDataStore = create<FormDataStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
  downloadFileName: 'biodata_file',
  setDownloadFileName: (name) => set({ downloadFileName: name }),
}));
