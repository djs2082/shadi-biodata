import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useIsMobile } from '../../hooks/useMediaQuery';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import BasicTemplate from '../BioDataTemplates/BasicTemplate';
import imageFrame from '../BioDataTemplates/images/imageFrame.png';

import AddImage from './components/AddImage';
import FormGroup from './components/FormGroup';
import MobileAddImage from './components/MobileAddImage';
import './index.scss';
import useBioDataFormViewModel from './viewModel';

const BioDataForm = () => {
  const viewModel = useBioDataFormViewModel();
  const isMobile = useIsMobile();

  const [params] = useSearchParams();
  const isDev = params.get('dev');

  const targetDevRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    viewModel.setTodaysBioDataCount();
    viewModel.updateBioDataDataForDev(isDev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateData = () => {
    if (!viewModel.validateData()) {
      localStorage.setItem('biodataData', JSON.stringify(viewModel.getData()));
      downloadPdf();
    }
  };

  const downloadPdf = async () => {
    const blob = await pdf(
      <BasicTemplate
        data={viewModel.getData()}
        image={viewModel.getCroppedImage()}
      />
    ).toBlob();
    saveAs(blob, viewModel.getDownloadFileName());
    viewModel.setTodaysBioDataCount();
  };

  return (
    <>
      <div ref={targetDevRef} className="biodata-form-outer-wrapper">
        <img className="design-image-left" src={imageFrame} alt="" />
        {isMobile && <MobileAddImage />}
        <div className="biodata-form-wrapper">
          <div className="biodata-fields-wrapper">
            <FormGroup />
            <div className="biodata-form-buttons-wrpper">
              <PrimaryButton onClick={() => validateData()}>
                Submit
              </PrimaryButton>
              <SecondaryButton onClick={() => viewModel.resetFormFields()}>
                Reset Form
              </SecondaryButton>
            </div>
          </div>
          {!isMobile && <AddImage />}
        </div>
      </div>
    </>
  );
};

export default BioDataForm;
