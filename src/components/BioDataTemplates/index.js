import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../UtilComponents/Buttons/SecondaryButton';
const BioDataTemplates = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '80px',
        flexDirection: 'column',
        rowGap: '16px',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <SecondaryButton onClick={() => navigate('/template/basic_template')}>
        Basic Template
      </SecondaryButton>
      <SecondaryButton>Advance Template</SecondaryButton>
    </div>
  );
};

export default BioDataTemplates;
