import { BorderColor } from "@mui/icons-material";
import Button from "@mui/material/Button";

interface SecondaryButtonProps {
  sx?: { [key: string]: string };
  disabled?: boolean;
  disableRipple?: boolean;
  children: string;
  onClick: (e: any) => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  sx,
  disabled,
  disableRipple,
  children,
  onClick,
}) => {
  const SecondaryButtonStyle = {
    ...sx,
    maxWidth: "100%",
    height: "40px",
    width: "240px",
    background: "white",
    borderRadius: "4px",
    fontSize: "16px",
    textAlign: "centers",
    color: "#004b87",
    textTransform: "none",
    border: "1px solid #0483df",
    "&:hover": {
      boxShadow: "0px 4px 4px rgba(138, 110, 147, 0.5)",
    },
    "&:active": {
      background: "#0483df",
      color: "white",
    },

    "&:disabled": {
      border: "1px solid #e5eef1",
      color: "#bcccd3",
    },
  };

  return (
    <Button
      className="secondary-button"
      disabled={disabled}
      disableRipple
      sx={SecondaryButtonStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default SecondaryButton;
