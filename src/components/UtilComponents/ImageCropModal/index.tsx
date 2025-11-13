import { Button } from '@mui/material';
import './index.scss';

interface ImageCropModalProps {
  show: boolean;
  bodyContent: JSX.Element;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  show,
  bodyContent,
}) => {
  return show ? (
    <div className="image-crop-modal-wrapper">
      <div className="image-crop-modal-inner-wrapper">
        <div className="image-crop-modal-content-wrapper">
          <div className="image-crop-modal-content">{bodyContent}</div>
          <div className="image-crop-modal-buttons-wrapper">
            <div className="action-buttons-wrapper">
              <Button
                variant="outlined"
                className="cancel-btn"
                onClick={() => {
                  // Handler implementation needed
                }}
              >
                CANCEl
              </Button>
              <Button
                variant="outlined"
                className="crop-btn"
                onClick={() => {
                  // Handler implementation needed
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
};

export default ImageCropModal;
