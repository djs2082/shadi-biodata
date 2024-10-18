import Button from "@mui/material/Button";

interface SecondaryButtonProps {
  sx?: { [key: string]: string };
  disabled?: boolean;
  disableRipple?: boolean;
  children: string | JSX.Element;
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
    background: "rgba(218, 165, 32, 0.8)",
    border: "1px solid rgba(218, 165, 32, 1)",
    borderRadius: "40px",
    fontSize: "16px",
    textAlign: "centers",
    color: "black",
    textTransform: "none",
    zIndex: 2,
    "&:hover": {
      background: "rgba(218, 165, 32, 1)",
      border: "1px solid #DAA520",
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
