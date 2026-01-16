import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useFormData } from '../../hooks/useFormData';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../contexts/LanguageContext';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import imageFrame from '../BioDataTemplates/images/imageFrame.png';

import AddImage from './components/AddImage';
import FormGroup from './components/FormGroup';
import MobileAddImage from './components/MobileAddImage';
import LanguageSelector from '../molecules/LanguageSelector';
import './index.scss';

const BioDataForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    data,
    initializeData,
    fetchTodaysBioDataCount,
    validateData: validateFormData,
    resetFormFields,
  } = useFormData();

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
      navigate('/select-template');
    }
  };

  return (
    <>
      <div ref={targetDevRef} className="biodata-form-outer-wrapper">
        <img className="design-image-left" src={imageFrame} alt="" />
        {isMobile && <MobileAddImage />}
        <div className="biodata-form-wrapper">
          <div className="biodata-fields-wrapper">
            <div className="language-selector-container">
              <LanguageSelector />
            </div>
            <FormGroup />
            <div className="biodata-form-buttons-wrpper">
              <PrimaryButton onClick={handleSubmit}>{t('buttons.submit')}</PrimaryButton>
              <SecondaryButton onClick={resetFormFields}>
                {t('buttons.reset')}
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
