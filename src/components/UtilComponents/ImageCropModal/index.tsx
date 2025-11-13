// import ReactDOM from "react-dom";
import { Button } from '@mui/material';
import './index.scss';
// import { useGlobalContext } from "./context";
// import Crop from "./cropper";

interface ImageCropModalProps {
  show: boolean;
  bodyContent: JSX.Element;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  show,
  bodyContent,
}) => {
  // const doneCropHandling = () => {
  //   setShowModal(false);
  //   showCroppedImage();
  // };
  // const cancelCropHandling = () => {
  //   setShowModal(false);
  // };
  return show ? (
    <div className="image-crop-modal-wrapper">
      <div className="image-crop-modal-inner-wrapper">
        {/* <header className="bg-pink-500  text-white text-xl text-center">
          Lets Crop Something
        </header> */}
        <div className="image-crop-modal-content-wrapper">
          <div className="image-crop-modal-content">{bodyContent}</div>
          <div className="image-crop-modal-buttons-wrapper">
            <div className="action-buttons-wrapper">
              <Button
                variant="outlined"
                className="cancel-btn"
                // className="p-2 text-white bg-blue-500"
                onClick={() => {
                  // doneCropHandling();
                }}
              >
                CANCEl
              </Button>
              <Button
                variant="outlined"
                className="crop-btn"
                // className="p-2 text-white bg-blue-500"
                onClick={() => {
                  // doneCropHandling();
                }}
              >
                CROP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );

  // return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default ImageCropModal;
