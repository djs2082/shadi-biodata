import React, { useState, useRef, useEffect } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { fileTypeFromBuffer, FileTypeResult } from "file-type";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ImageIcon from "@mui/icons-material/Image";
import SecondaryButton from "../../UtilComponents/Buttons/SecondaryButton";
import PrimaryButton from "../../UtilComponents/Buttons/PrimaryButton";
import CustomModal from "../../UtilComponents/Modals/Modal";
import Cropper from "react-cropper"; // Assuming you're using react-cropper
import "cropperjs/dist/cropper.css";
import useBioDataFormViewModel from "./../viewModel";
import {
  removeImageFromLocalStorage,
  retrieveImageBlobFromLocalStorage,
  saveImageBlobToLocalStorage,
} from "../../../services/localStorageService";
import { IconButton, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  addImageToDB,
  deleteImageFromDB,
  getImageFromDB,
} from "./../../../services/indexedDB";

interface SelectedImage {
  file: string | ArrayBuffer | null;
  name: string | null;
  size: number | null;
  type: string | null;
}

const AddImage = () => {
  const viewModel = useBioDataFormViewModel();
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    file: null,
    name: null,
    size: null,
    type: null,
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileFormatSupported, setFileFormatSupported] = useState(true);
  const cropperRef = useRef<HTMLImageElement>(null); // For cropper instance
  const [cropper, setCropper] = useState<Cropper | null>();
  const setCroppedImage = viewModel.setCroppedImage;
  const croppedImage = viewModel.getCroppedImage();

  const inputRef = useRef<HTMLInputElement>(null);

  const resizeImage = (imageBlob: Blob, width: number, height: number) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, "image/jpeg", 0.7); // Compressing the image
      };
    });
  };

  useEffect(() => {
    getImageFromDB()
      .then((result) => {
        resizeImage(result, 800, 600).then((resizedBlob) => {
          const objectURL = URL.createObjectURL(resizedBlob as Blob);
          setCroppedImage(objectURL); // Set the resized image for rendering
        });
        // console.log(result);
        // setCroppedImage(URL.createObjectURL(result));
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      URL.revokeObjectURL(croppedImage || "");
    };
  }, []);

  const isValidFileFormat = (mimeType: FileTypeResult | undefined): boolean => {
    return mimeType ? mimeType.mime.split("/")[0] === "image" : false;
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let files: FileList | null = e.target.files;
    console.log(files);
    if (files && files[0]) {
      const blob = files[0];
      const reader = new FileReader();
      const readerDataUri = new FileReader();

      reader.readAsArrayBuffer(blob);

      reader.onloadend = async (event) => {
        if (
          event.target?.readyState === FileReader.DONE &&
          event.target.result
        ) {
          const uint = new Uint8Array(event.target.result as ArrayBuffer);
          const mimeType = await fileTypeFromBuffer(uint);
          if (isValidFileFormat(mimeType)) {
            readerDataUri.onload = (eventDataUri) => {
              console.log(files);
              setSelectedImage({
                file: eventDataUri.target?.result || null,
                name: files ? files[0].name : null,
                size: files ? files[0].size : null,
                type: files ? files[0].type : null,
              });
              setShowCropModal(true);
            };

            readerDataUri.readAsDataURL(
              new Blob([uint], { type: mimeType?.mime })
            );
          } else {
            setFileFormatSupported(false);
            setTimeout(() => setFileFormatSupported(true), 2000);
          }
        }
      };
    }
  };

  const blobbedImage = (blob: Blob) => {
    addImageToDB(uuidv4(), blob)
      .then((result) => {
        console.log(result);
        setShowCropModal(false);
        setFileFormatSupported(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveProfilePicture = () => {
    cropper?.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          resizeImage(blob, 800, 600).then((resizedBlob) => {
            const objectURL = URL.createObjectURL(resizedBlob as Blob);
            setCroppedImage(objectURL); // Set the resized image for rendering
          });
          // const croppedUrl = URL.createObjectURL(blob);
          // setCroppedImage(croppedUrl);
          // viewModel.setCroppedImage(croppedUrl);
          blobbedImage(blob);
        }
      },
      "image/jpeg",
      0.75
    );
  };

  const closeCropModal = () => {
    setSelectedImage({
      name: null,
      size: null,
      type: null,
      file: null,
    });
    setCroppedImage(null);
    setShowCropModal(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleZoom = (e: React.WheelEvent) => {
    console.log(e);
    e.preventDefault(); // Prevent the default scroll behavior
    if (cropper) {
      const zoomRatio = e.deltaY < 0 ? 0.1 : -0.1; // Adjust the zoom ratio as needed
      const newZoom = cropper.getData().scaleX + zoomRatio;

      // Restrict the zoom to a minimum of 1 (original size)
      if (newZoom >= 1) {
        cropper.zoom(zoomRatio);
      }
    }
  };

  const removeSelectedImage = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    isReplace = false
  ) => {
    if (!isReplace) e.stopPropagation();
    setSelectedImage({ file: null, name: null, size: null, type: null });
    setCroppedImage(null);
    // removeImageFromLocalStorage("profile_picture");
    deleteImageFromDB();
    cropper?.destroy();
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input value
    }
  };

  return (
    <>
      <div
        className="biodata-profile-picture-wrapper"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {croppedImage && (
          <>
            <div
              className="replace-photo-btn"
              onClick={(e) => removeSelectedImage(e, true)}
            >
              <ImageIcon></ImageIcon>Replace Photo
            </div>
            <Tooltip title="Remove the Profile Picture">
              <IconButton
                className="close-btn"
                onClick={(e) => removeSelectedImage(e)}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
            <img
              src={croppedImage}
              alt={selectedImage.name || "Selected Image"}
              className="biodata-profile-picture-wrapper"
              style={{ marginBottom: "0" }}
              // style={{ width: "100%", height: "auto", marginTop: "10px" }} // Adjust styles as needed
            />
          </>
        )}{" "}
        <input
          id="fileInput"
          className="d-none"
          type="file"
          disabled={showCropModal}
          accept="image/*"
          style={{ display: "none", cursor: "not-allowed" }}
          onChange={onFileChange}
          ref={inputRef}
        />
        <>
          {!croppedImage && (
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
          <CustomModal
            show={showCropModal}
            onHide={closeCropModal}
            header={<div>Set Profile Photo</div>}
            className="crop-modal"
            body={
              <div onWheel={handleZoom}>
                <Cropper
                  style={{ height: 400, width: 280 }}
                  zoomTo={0.5}
                  // initialAspectRatio={280 / 400}
                  preview=".img-preview"
                  src={selectedImage.file as string}
                  // viewMode={1}
                  minCropBoxHeight={400}
                  minCropBoxWidth={280}
                  background={false}
                  responsive
                  // autoCropArea={1}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  cropBoxResizable={false}
                  // cropBoxMovable={false}
                  checkOrientation={false}
                  guides
                />
              </div>
            }
            primaryButton={
              <PrimaryButton onClick={saveProfilePicture}>Save</PrimaryButton>
            }
            secondaryButton={
              <SecondaryButton onClick={closeCropModal}>Close</SecondaryButton>
            }
          />
        </>
      </div>
    </>
  );
};

export default AddImage;
