import React, { useState, useRef, useEffect } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { fileTypeFromBuffer, FileTypeResult } from "file-type";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ImageIcon from "@mui/icons-material/Image";
import SecondaryButton from "../../UtilComponents/Buttons/SecondaryButton";
import PrimaryButton from "../../UtilComponents/Buttons/PrimaryButton";
import CustomModal from "../../UtilComponents/Modals/Modal";
import Cropper from "react-cropper"; // Assuming you're using react-cropper
import "cropperjs/dist/cropper.css";
import useBioDataFormViewModel from "./../viewModel";
import { IconButton, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  addImageToDB,
  deleteImageFromDB,
  getImageFromDB,
} from "./../../../services/indexedDB";
import Media from "react-media";
import imageFrameOld from "./../../BioDataTemplates/images/imageFrameOld2.png";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            console.log(fileFormatSupported);
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

  const isMobile = () => window.screen.width <= 480;

  return (
    <div className="profile-image-container">
      <div
        className="biodata-profile-picture-wrapper"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <img className="profile-image-wrapper" alt="" src={imageFrameOld} />
        {croppedImage && (
          <>
            <div
              className="replace-photo-btn"
              onClick={(e) => removeSelectedImage(e, true)}
            >
              {" "}
              <ImageIcon></ImageIcon>
              <Media
                queries={{
                  mobile: "(max-width: 480px)",
                  web: "(min-width: 480px)",
                }}
              >
                {(matches) => (
                  <>
                    {matches.mobile && "Replace"}
                    {matches.web && "Replace Photo"}
                  </>
                )}
              </Media>
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
              className="biodata-profile-picture"
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
            <Media
              queries={{
                mobile: "(max-width: 480px)",
                web: "(min-width: 480px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.mobile && (
                    <>
                      <AddAPhotoIcon
                        sx={{
                          width: "100px",
                          fontSize: "60px",
                          color: "#64728c",
                        }}
                      />
                      <p>
                        Click here <br />
                        (Up to 20MB only)
                      </p>
                    </>
                  )}
                  {matches.web && (
                    <>
                      <IconButton
                        disableRipple
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "2px",
                          fontSize: "16px",
                          transition:
                            "transform 0.1s ease-in-out, color 0.3s ease-in-out", // Smooth transition
                          "&:hover": {
                            transform: "scale(1.2)", // Grow the icon by 20% on hover
                          },
                        }}
                      >
                        <AddAPhotoIcon
                          sx={{
                            color: "#5E5E5E",
                            width: "100px",
                            fontSize: "100px",
                            // transition:
                            //   "transform 0.2s ease-in-out, color 0.3s ease-in-out", // Smooth transition
                            // "&:hover": {
                            //   transform: "scale(1.2)", // Grow the icon by 20% on hover
                            // },
                            // color: "#64728c",
                          }}
                        />

                        <p
                          style={{
                            color: "#5E5E5E",
                            fontWeight: "bold",
                            margin: 0,
                          }}
                        >
                          {"Add your photo".toUpperCase()} <br />
                        </p>
                      </IconButton>
                    </>
                  )}
                </>
              )}
            </Media>
          )}
          <CustomModal
            show={showCropModal}
            onHide={closeCropModal}
            header={
              <div style={{ margin: "0px 0px 24px 0px" }}>
                Set Profile Photo
              </div>
            }
            className="crop-modal"
            body={
              <div onWheel={handleZoom}>
                <Cropper
                  style={{
                    height: isMobile() ? 228.6 : 400,
                    width: isMobile() ? 160 : 280,
                  }}
                  zoomTo={0.5}
                  // initialAspectRatio={280 / 400}
                  preview=".img-preview"
                  src={selectedImage.file as string}
                  // viewMode={1}
                  minCropBoxHeight={isMobile() ? 228.6 : 400}
                  minCropBoxWidth={isMobile() ? 160 : 280}
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
              <Media
                queries={{
                  mobile: "(max-width: 480px)",
                  web: "(min-width: 480px)",
                }}
              >
                {(matches) => (
                  <>
                    {matches.mobile && (
                      <PrimaryButton onClick={saveProfilePicture}>
                        Save Crop
                      </PrimaryButton>
                    )}
                    {matches.web && (
                      <PrimaryButton onClick={saveProfilePicture}>
                        Save
                      </PrimaryButton>
                    )}
                  </>
                )}
              </Media>
            }
            secondaryButton={
              <SecondaryButton onClick={closeCropModal}>Close</SecondaryButton>
            }
          />
        </>
      </div>
    </div>
  );
};

export default AddImage;
