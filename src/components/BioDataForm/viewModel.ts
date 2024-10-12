import axios from "axios";
import useBioDataFormDataStore, { BioDataFormDataStore } from "./index.store";
import _ from "lodash";
import React from "react";
import { FormDataFields, FormDataPreFilledFields } from "./formDataFields";

class BioDataFormViewModel {
  private store: BioDataFormDataStore;
  private url: string;

  constructor(store: BioDataFormDataStore) {
    this.store = store;
    this.url =
      process.env.NODE_ENV === "production"
        ? "https://api.counterapi.dev/v1/shadibiodata/prod"
        : "https://api.counterapi.dev/v1/shadibiodata/dev";
  }

  public getShowAddNewFieldForm = () => this.store.showAddNewFieldForm;
  public setShowAddNewFieldForm = (show: boolean) =>
    this.store.setShowAddNewFieldForm(show);

  public getExtraFieldAddGroupId = () => this.store.extraFieldAddGroupId;
  public setExtraFieldAddGroupId = (id: number | null) =>
    this.store.setExtraFieldAddGroupId(id);

  public getShowImageCropModal = () => this.store.showAddNewFieldForm;
  public hideImageCropModal = () => this.store.setShowImageCropModal(false);
  public showImageCropModal = () => this.store.setShowImageCropModal(true);

  public getCroppedImage = () => this.store.croppedImage;
  public setCroppedImage = (image: string | null) => {
    console.log(image);
    this.store.setCroppedImage(image);
  };

  public getCroppedImageUrl = () => this.store.croppedImageUrl;
  public setCroppedImageUrl = (image: string | null) =>
    this.store.setCroppedImageUrl(image);

  public getShowExtraFieldForm = () => this.store.showAddNewFieldForm;
  public hideExtraFieldForm = () => {
    this.store.setShowAddNewFieldForm(false);
    this.store.setExtraFieldAddGroupId(null);
  };
  public setShowExtraFieldForm = (id: number) => {
    this.store.setExtraFieldAddGroupId(id);
    this.store.setShowAddNewFieldForm(true);
  };

  public getTodaysBioDataCount = () => {
    return this.store.todaysBiodataCount;
  };

  public getDownloadFileName = () => this.store.downloadFileName;

  public setTodaysBioDataCount = () => {
    axios.get(this.url).then((res) => {
      console.log(res.data.count);
      this.store.setTodaysBiodataCount(res.data.count);
    });
  };

  public getData = () => this.store.data;
  public updateBioDataDataForDev = (isDev: string | null) => {
    const savedData = localStorage.getItem("biodataData");
    if (isDev) this.store.setData(FormDataPreFilledFields);
    if (savedData) this.store.setData(JSON.parse(savedData));
  };

  public onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // const file = e.target.files[0];
      // let imageDataUrl = await readFile(file);
      console.log("uploading files");
      // setImageSrc(imageDataUrl);
      this.store.setShowImageCropModal(true);
    }
  };

  public removeFormField = (parentDataId: number, childDataId: number) => {
    const data = this.store.data;
    const updatedFormDataGroups = data.map((group) => {
      if (group.id === parentDataId) {
        return {
          ...group,
          data: group.data.filter((field) => field.id !== childDataId),
        };
      }
      return group;
    });
    this.store.setData(updatedFormDataGroups);
  };

  public addFormField = (label: string, value: string) => {
    const updatedFormDataGroups = this.store.data.map((group) => {
      if (group.id === this.store.extraFieldAddGroupId) {
        const maxId = Math.max(...group.data.map((field) => field.id));
        return {
          ...group,
          data: [
            ...group.data,
            {
              id: maxId + 1, // New field ID
              label: label,
              value: value || "",
              type: "string",
              required: false,
            },
          ],
        };
      }
      return group;
    });
    this.store.setData(updatedFormDataGroups);
    this.hideExtraFieldForm();
  };

  public resetFormFields = () => {
    localStorage.setItem("biodataData", "");
    // const updatedFormDataGroups: FormDataFieldGorup[] = this.store.data.map(
    //   (group) => ({
    //     ...group,
    //     data: group.data.map((field) => ({
    //       ...field,
    //       value: "",
    //     })),
    //   })
    // );
    this.store.setData(FormDataFields); // Update state with the new array
  };

  public moveTheFormField = (
    parentFiledId: number,
    childFieldId: number,
    direction: "up" | "down"
  ) => {
    const parentGroup = this.store.data.find(
      (group) => group.id === parentFiledId
    );
    if (!parentGroup) return;
    const data = parentGroup?.data;
    const index = data.findIndex((item) => item.id === childFieldId);
    if (index === -1) {
      console.error("Item not found");
      return; // Item not found, return original array
    }
    const newIndex = direction === "up" ? index - 1 : index + 1;
    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= data.length) {
      console.error("Cannot move in that direction");
      return; // New index is out of bounds
    }

    // Swap the elements
    const newData = [...data]; // Create a copy of the array
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    this.store.setData(
      this.store.data.map((group) => {
        if (group.id === parentFiledId) {
          return { ...group, data: newData };
        }
        return group;
      })
    );
  };

  public validateData = () => {
    let error = false;
    const newFormDataFieldsGroup = this.store.data.map((group) => {
      const newDataArray = group.data.map((field) => {
        if (field.required) {
          if (field.value === "") {
            error = true;
            return { ...field, error: true };
          } else {
            return { ...field, error: false };
          }
        }
        return field;
      });
      return { ...group, data: newDataArray };
    });
    if (error) {
      this.store.setData(newFormDataFieldsGroup);
      // if (targetDevRef.current) {
      //   targetDevRef.current.scrollIntoView({ behavior: 'smooth' });
      // }
    }
    return error;
  };

  public handleValueChange = (
    groupId: number,
    fieldId: number,
    value: string
  ) => {
    const updatedFormDataGroups = this.store.data.map((group) => {
      if (group.id === groupId) {
        group.data = group.data.map((field) => {
          if (field.id === fieldId) {
            if (field.label === "Full Name")
              this.store.setDownloadFileName(`${_.snakeCase(value)}_biodata`);
            return {
              ...field,
              value,
            };
          }
          return field;
        });
      }
      return group;
    });

    this.store.setData(updatedFormDataGroups); // Update state with the new array
  };
}

const useBioDataFormViewModel = () => {
  const store = useBioDataFormDataStore();
  return new BioDataFormViewModel(store);
};

export default useBioDataFormViewModel;
