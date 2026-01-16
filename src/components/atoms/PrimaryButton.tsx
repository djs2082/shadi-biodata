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
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    textTransform: 'none',
    zIndex: 2,
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    transition: 'all 0.3s ease',

    '&:hover': {
      background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
      boxShadow:
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      background: '#991b1b',
      transform: 'translateY(0)',
    },
    '&:disabled': {
      background: '#e2e8f0',
      color: '#94a3b8',
      boxShadow: 'none',
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
