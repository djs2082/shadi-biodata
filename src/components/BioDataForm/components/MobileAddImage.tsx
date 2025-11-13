import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';

import PrimaryButton from '../../UtilComponents/Buttons/PrimaryButton';
import SecondaryButton from '../../UtilComponents/Buttons/SecondaryButton';
import CustomModal from '../../UtilComponents/Modals/Modal';
import useBioDataFormViewModel from '../viewModel';

import AddImage from './AddImage';

const MobileAddImage = () => {
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const viewModel = useBioDataFormViewModel();
  const croppedImage = viewModel.getCroppedImage();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0',
        position: 'sticky',
        top: '0',
        zIndex: '6',
        width: '100%',
        height: '60px',
        backgroundColor: '#fdf5e6',
      }}
    >
      <SecondaryButton
        onClick={() => {
          setShowAddImageModal(true);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '8px',
            height: '32px',
          }}
        >
          <AddAPhotoIcon></AddAPhotoIcon>
          <span style={{ position: 'relative', top: '1px' }}>
            {croppedImage ? 'View Profile Photo' : ' Add Profile Photo'}
          </span>
        </div>
      </SecondaryButton>
      <CustomModal
        show={showAddImageModal}
        onHide={() => setShowAddImageModal(false)}
        header={
          <div style={{ margin: '0 0 64px 0' }}>
            {'Add Profile Picture'.toUpperCase()}
          </div>
        }
        body={<AddImage></AddImage>}
        primaryButton={
          <div style={{ margin: '32px 0 0 0' }}>
            <PrimaryButton
              onClick={() => {
                setShowAddImageModal(false);
              }}
            >
              Save
            </PrimaryButton>
          </div>
        }
      />
    </div>
  );
};
export default MobileAddImage;
