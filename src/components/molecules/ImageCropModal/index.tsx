import { Button } from '@mui/material';

interface ImageCropModalProps {
  show: boolean;
  bodyContent: JSX.Element;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  show,
  bodyContent,
}) => {
  return show ? (
    <div className="absolute bg-gray-500/50 h-[600px] w-[500px] flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-between bg-white text-center w-full h-full">
          <div className="bg-black h-[389px] w-[500px] relative">
            {bodyContent}
          </div>
          <div className="flex justify-center gap-10 py-2 h-[211px]">
            <div className="items-end h-6">
              <Button
                variant="outlined"
                className="w-20 h-6"
                onClick={() => {
                  // Handler implementation needed
                }}
              >
                CANCEl
              </Button>
              <Button
                variant="outlined"
                className="w-20 h-6"
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
