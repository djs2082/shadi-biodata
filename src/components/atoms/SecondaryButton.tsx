import Button from '@mui/material/Button';

interface SecondaryButtonProps {
  sx?: { [key: string]: string };
  disabled?: boolean;
  disableRipple?: boolean;
  children: string | JSX.Element;
  onClick: () => void;
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
    maxWidth: '100%',
    height: '40px',
    width: '240px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#334155',
    textTransform: 'none',
    zIndex: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#fef2f2',
      border: '1px solid #dc2626',
      color: '#dc2626',
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    '&:active': {
      background: '#fef2f2',
      border: '1px solid #b91c1c',
      color: '#b91c1c',
    },

    '&:disabled': {
      border: '1px solid #e2e8f0',
      background: '#f8fafc',
      color: '#94a3b8',
    },
  };

  return (
    <Button
      className="secondary-button"
      disabled={disabled}
      disableRipple={disableRipple}
      sx={SecondaryButtonStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default SecondaryButton;
