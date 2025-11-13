import Button from '@mui/material/Button';

interface PrimaryButtonProps {
  sx?: { [key: string]: string };
  disabled?: boolean;
  disableRipple?: boolean;
  onClick: () => void;
  children: string;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  sx,
  disabled,
  disableRipple,
  onClick,
  children,
  className,
}) => {
  const PrimaryButtonStyle = {
    ...sx,
    maxWidth: '100%',
    height: '40px',
    width: '240px',
    backgroundColor: 'rgba(128, 0, 0, 0.8)',
    borderRadius: '40px',
    fontSize: '16px',
    textAlign: 'center',
    color: 'white',
    textTransform: 'none',
    zIndex: 2,

    '&:hover': {
      boxShadow: '0px 4px 4px rgba(138, 110, 147, 0.5)',
      borderRadius: '40px',
      backgroundColor: 'rgba(128, 0, 0, 1)',
    },
    '&:active': {
      background: '#004b87',
    },
    '&:disabled': {
      background: '#e5eef1',
      color: '#bcccd3',
    },
  };

  return (
    <Button
      className={`primary-button ${className}`}
      disabled={disabled}
      disableRipple={disableRipple}
      sx={PrimaryButtonStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
