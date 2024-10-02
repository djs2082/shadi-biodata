import { Button } from "@mui/material";
import FormField from "../UtilComponents/FormField";
import AddIcon from "@mui/icons-material/Add";
import "./index.scss";
import { useCallback, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Helper function to crop the image (explained below)
import { Area } from "react-easy-crop";
import axios from "axios";
import ImageCropModal from "../UtilComponents/ImgeCropModal";
// import { relative } from "path";

interface FormDataField {
  id: number;
  label: string;
  type: string;
  required: boolean;
}

interface FormDataFieldGorup {
  id: number;
  title: string;
  data: FormDataField[];
}

const BioDataForm = () => {
  const BioDataFormData: FormDataFieldGorup[] = [
    {
      id: 1,
      title: "Personal Details",
      data: [
        {
          id: 1,
          label: "Full Name",
          type: "text",
          required: true,
        },
        {
          id: 2,
          label: "Date Of Birth",
          type: "date",
          required: true,
        },
        {
          id: 3,
          label: "Place Of Birth",
          type: "text",
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: "Family Details",
      data: [
        {
          id: 1,
          label: "Full Name",
          type: "text",
          required: true,
        },
        {
          id: 2,
          label: "Date Of Birth",
          type: "date",
          required: true,
        },
        {
          id: 3,
          label: "Place Of Birth",
          type: "text",
          required: true,
        },
      ],
    },
    {
      id: 3,
      title: "Education Details",
      data: [
        {
          id: 1,
          label: "Full Name",
          type: "text",
          required: true,
        },
        {
          id: 2,
          label: "Date Of Birth",
          type: "date",
          required: true,
        },
        {
          id: 3,
          label: "Place Of Birth",
          type: "text",
          required: true,
        },
      ],
    },
  ];

  const ExtraFieldTemplate = {
    label: "Field",
    type: "string",
    required: false,
  };

  const [formDataFieldsGroup, setFormDataFieldsGroup] =
    useState<FormDataFieldGorup[]>(BioDataFormData);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const removeFormField = (parentDataId: number, childDataId: number) => {
    console.log("here");
    const updatedFormDataGroups = formDataFieldsGroup.map((group, index) => {
      if (group.id === parentDataId) {
        return {
          ...group,
          data: group.data.filter((field) => field.id !== childDataId),
        };
      }
      return group;
    });
    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
  };

  const addFormField = (id: number) => {
    const updatedFormDataGroups = formDataFieldsGroup.map((group, index) => {
      if (group.id === id) {
        return {
          ...group,
          data: [
            ...group.data,
            {
              id: group.data.length + 1, // New field ID
              ...ExtraFieldTemplate,
            },
          ],
        };
      }
      return group;
    });

    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
  };

  const moveTheFormField = (
    parentFiledId: number,
    childFieldId: number,
    direction: "up" | "down"
  ) => {
    const parentGroup = formDataFieldsGroup.find(
      (group) => group.id === parentFiledId
    );
    if (!parentGroup) return;
    const data = parentGroup?.data;
    const index = data.findIndex((item) => item.id === childFieldId);
    if (index === -1) {
      console.error("Item not found");
      return; // Item not found, return original array
    }
    let newIndex = direction === "up" ? index - 1 : index + 1;
    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= data.length) {
      console.error("Cannot move in that direction");
      return; // New index is out of bounds
    }

    // Swap the elements
    const newData = [...data]; // Create a copy of the array
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    setFormDataFieldsGroup(
      formDataFieldsGroup.map((group) => {
        if (group.id === parentFiledId) {
          return { ...group, data: newData };
        }
        return group;
      })
    );
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedArea) return;
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedArea);
      setCroppedImage(croppedImageUrl);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedArea]);

  const handleUpload = async () => {
    if (!croppedImage || !imageFile) return;

    const formData = new FormData();
    const blob = await (await fetch(croppedImage)).blob(); // Converting cropped image to Blob

    formData.append("image", blob, imageFile.name);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      console.log("uploading files");
      setImageSrc(imageDataUrl);
      setShowModal(true);
    }
  };

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="biodata-form-wrapper">
      <div className="biodata-fields-wrapper">
        {formDataFieldsGroup.map((data) => (
          <>
            <p className="biodata-field-title">{data.title}</p>
            {data.data.map((field) => (
              <FormField
                key={field.id}
                label={field.label}
                required={field.required}
                onDelete={() => removeFormField(data.id, field.id)}
                onFieldMove={(direction: "up" | "down") =>
                  moveTheFormField(data.id, field.id, direction)
                }
              />
            ))}
            <Button
              variant="text"
              className="add-field-btn"
              onClick={() => addFormField(data.id)}
            >
              <AddIcon /> Add More Fields
            </Button>
          </>
        ))}
      </div>

      <input
        id="fileInput"
        className="d-none"
        type="file"
        // accept="image/*"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      <div
        className="biodata-profile-picture-wrapper"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {croppedImage ? (
          <img className="h-48" src={croppedImage} alt="crop" />
        ) : (
          <>
            <PermMediaIcon
              sx={{ width: "100px", fontSize: "100px", color: "#64728c" }}
            />
            <p>
              Click here to add your photo <br />
              (Up to 20MB in size)
            </p>
          </>
        )}

        {/* Buttons for cropping and uploading */}
        {/* <button onClick={showCroppedImage}>Crop Image</button>
        <button onClick={handleUpload} disabled={!croppedImage}>
          Upload Image
        </button> */}
      </div>

      <ImageCropModal
        show={showModal}
        bodyContent={
          <div>
            <div></div>
            {/* <Cropper
              image={imageSrc}
              crop={crop}
              // rotation={rotation}
              zoom={zoom}
              aspect={3 / 3}
              onCropChange={setCrop}
              // onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            /> */}
          </div>
        }
        // buttons={[
        //   <Button variant="contained"></Button>,
        //   <Button variant="outlined"></Button>,
        // ]}
        // onHide={() => {}}
      />
      {/* </input> */}
    </div>
  );
};

export default BioDataForm;
