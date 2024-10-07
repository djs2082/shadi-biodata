import SecondaryButton from "../../UtilComponents/Buttons/SecondaryButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";
import CustomModal from "../../UtilComponents/Modals/Modal";
import AddImage from "./AddImage";
import PrimaryButton from "../../UtilComponents/Buttons/PrimaryButton";
import useBioDataFormViewModel from "../viewModel";

const MobileAddImage = () => {
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const viewModel = useBioDataFormViewModel();
  const croppedImage = viewModel.getCroppedImage();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SecondaryButton
        onClick={() => {
          setShowAddImageModal(true);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "8px",
            height: "32px",
          }}
        >
          <AddAPhotoIcon></AddAPhotoIcon>
          <span style={{ position: "relative", top: "1px" }}>
            {croppedImage ? "View Profile Photo" : " Add Profile Photo"}
          </span>
        </div>
      </SecondaryButton>
      <CustomModal
        show={showAddImageModal}
        onHide={() => setShowAddImageModal(false)}
        header={<div>Add Profile Picture</div>}
        body={<AddImage></AddImage>}
        primaryButton={
          <PrimaryButton
            onClick={() => {
              setShowAddImageModal(false);
            }}
          >
            Save
          </PrimaryButton>
        }
      />
    </div>
  );
};
export default MobileAddImage;
