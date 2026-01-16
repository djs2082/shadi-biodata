import { useNavigate } from 'react-router-dom';

import SecondaryButton from '../atoms/SecondaryButton';

const BioDataTemplates: React.FC = () => {
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
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '20px',
        }}
      >
        Biodata Templates Sandbox
      </h1>
      <SecondaryButton onClick={() => navigate('/template/basic_template')}>
        Basic Template
      </SecondaryButton>
      <SecondaryButton onClick={() => navigate('/template/golden_border')}>
        Golden Border Template
      </SecondaryButton>
      <SecondaryButton onClick={() => navigate('/template/navy_floral')}>
        Navy Floral Template
      </SecondaryButton>
      <SecondaryButton onClick={() => navigate('/template/ornate_gold')}>
        Ornate Gold Template
      </SecondaryButton>
      <SecondaryButton onClick={() => navigate('/template/free_template')}>
        Free Template
      </SecondaryButton>
      <SecondaryButton onClick={() => navigate('/template/traditional')}>
        Traditional Template
      </SecondaryButton>
    </div>
  );
};

export default BioDataTemplates;
