import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFormData } from '../../hooks/useFormData';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useUIStore } from '../../stores/uiStore';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import BasicTemplate from '../BioDataTemplates/BasicTemplate';
import imageFrame from '../BioDataTemplates/images/imageFrame.png';

import AddImage from './components/AddImage';
import FormGroup from './components/FormGroup';
import MobileAddImage from './components/MobileAddImage';
import './index.scss';

const BioDataForm = () => {
  const {
    data,
    downloadFileName,
    initializeData,
    fetchTodaysBioDataCount,
    validateData: validateFormData,
    resetFormFields,
  } = useFormData();

  const croppedImage = useUIStore((state) => state.croppedImage);
  const isMobile = useIsMobile();

  const [params] = useSearchParams();
  const isDev = params.get('dev');

  const targetDevRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTodaysBioDataCount();
    initializeData(isDev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const hasError = validateFormData();
    if (!hasError) {
      localStorage.setItem('biodataData', JSON.stringify(data));
      downloadPdf();
    }
  };

  const downloadPdf = async () => {
    const blob = await pdf(
      <BasicTemplate data={data} image={croppedImage} />
    ).toBlob();
    saveAs(blob, downloadFileName);
    fetchTodaysBioDataCount();
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
              <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
              <SecondaryButton onClick={resetFormFields}>
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
