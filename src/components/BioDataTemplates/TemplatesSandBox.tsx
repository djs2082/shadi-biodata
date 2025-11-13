import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getImageFromDB } from '../../services/indexedDB';
import { logger } from '../../utils/logger';

import BasicTemplate from './BasicTemplate';
import Data from './data';

const TemplatesSandBox: React.FC = () => {
  const { template_name } = useParams<{ template_name?: string }>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();

  const resizeImage = (
    imageBlob: Blob,
    width: number,
    height: number
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', 0.7);
      };
    });
  };

  useEffect(() => {
    getImageFromDB()
      .then((result) => {
        if (result) {
          resizeImage(result, 800, 600).then((resizedBlob) => {
            if (resizedBlob) {
              const objectURL = URL.createObjectURL(resizedBlob);
              setCroppedImage(objectURL);
            }
          });
        }
      })
      .catch((error) => {
        logger.error('Failed to load image from DB:', error);
      });
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTemplateComponent = (): JSX.Element => {
    switch (template_name) {
      case 'basic_template':
        return <BasicTemplate data={Data} image={croppedImage} />;
      default:
        return <></>;
    }
  };

  return (
    <PDFViewer style={{ width: '100%', height: '842px' }}>
      {getTemplateComponent()}
    </PDFViewer>
  );
};

export default TemplatesSandBox;
