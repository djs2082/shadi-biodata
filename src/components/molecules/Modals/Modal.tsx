import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { ReactNode } from 'react';

interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  header: ReactNode;
  body: ReactNode;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
  className?: string;
  style?: { [key: string]: string };
}
const reasonsToAvoidModalHide = ['backdropClick', 'escapeKeyDown'];

const modalDefaultStyle = {
  position: 'absolute',
  outline: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: `1px solid #e5eef1`,
  padding: '10px',
  boxShadow:
    '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(0, 0, 0, 0.08)',
  borderRadius: '8px',
};

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  onHide,
  header,
  body,
  className,
  primaryButton,
  secondaryButton,
  style,
}) => {
  const handleClose = (reason: string) => {
    if (reason && reasonsToAvoidModalHide.includes(reason)) return;
    onHide();
  };

  return (
    <div>
      <Modal open={show} onClose={handleClose} className={className}>
        <Box
          className="w-[545px] max-[480px]:w-[300px]"
          sx={{ ...modalDefaultStyle, ...style }}
        >
          {/* modal Header */}
          <div id="modal-header-content" className="flex justify-end">
            <span id="modal-close-button">
              <IconButton
                onClick={onHide}
                sx={{
                  backgroundColor: '#e5eef1',
                  width: '24px',
                  height: '24px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '10px',
                    color: '#0483df',
                    width: '15px',
                    height: '15px',
                    stroke: '#0483df',
                    strokeWidth: '2px',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </span>
          </div>
          {/* modal content */}
          <div className="flex flex-col px-[30px] pb-[26px] gap-y-6">
            {/* modal image and content */}
            <div
              id="modal-content"
              className="shadow-none flex gap-4 items-center flex-col"
            >
              <div
                id="modal-text-and-icon"
                className="shadow-none flex flex-row justify-center items-center gap-x-6 w-full"
              >
                <span id="modal-text" className="flex flex-col gap-2 w-full">
                  <span
                    id="modal-content-header"
                    className="text-[#788892] text-xl text-center"
                  >
                    {header}
                  </span>

                  <span
                    id="modal-content-body"
                    className="flex flex-row gap-6 justify-center items-center"
                  >
                    {body}
                  </span>
                </span>
              </div>
            </div>
            {/* modal content buttons */}
            <div id="modal-buttons" className="flex flex-row gap-6 w-full">
              {primaryButton}
              {secondaryButton}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
  // return <></>;
};

export default CustomModal;
