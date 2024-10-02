import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss";
interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  header: ReactNode;
  body: ReactNode;
  primaryButton: ReactNode;
  secondaryButton: ReactNode;
}
const reasonsToAvoidModalHide = ["backdropClick", "escapeKeyDown"];

const modalDefaultStyle = {
  position: "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: `1px solid #e5eef1`,
  padding: "10px",
  boxShadow:
    "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
  width: "545px",
};

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  onHide,
  header,
  body,
  primaryButton,
  secondaryButton,
}) => {
  const handleClose = (reason: string) => {
    if (reason && reasonsToAvoidModalHide.includes(reason)) return;
    onHide();
  };

  return (
    <div className="modal-box">
      <Modal open={show} onClose={handleClose}>
        <Box sx={modalDefaultStyle}>
          {/* modal Header */}
          <div id="modal-header-content" className="modal-header-content">
            <span id="modal-close-button" className="modal-close-button">
              <IconButton onClick={onHide}>
                <CloseIcon />
              </IconButton>
            </span>
          </div>
          {/* modal content */}
          <div className="modal-details">
            {/* modal image and content */}
            <div id="modal-content" className="modal-content">
              <div
                id="modal-text-and-icon"
                className="modal-text-and-icon"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "24px",
                }}
              >
                <span
                  id="modal-text"
                  className="modal-text"
                  style={{
                    width: "100%",
                  }}
                >
                  <span
                    id="modal-content-header"
                    className="modal-content-header"
                    style={{ textAlign: "center" }}
                  >
                    {header}
                  </span>

                  <span
                    id="modal-content-body"
                    className="modal-content-body"
                    style={{
                      flexDirection: "row",
                      gap: "24px",
                    }}
                  >
                    {body}
                  </span>
                </span>
              </div>
            </div>
            {/* modal content buttons */}
            <div
              id="modal-buttons"
              className="modal-buttons"
              style={{
                flexDirection: "row",
                gap: "24px",
              }}
            >
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
