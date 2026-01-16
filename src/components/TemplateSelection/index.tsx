import { PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getImageFromDB } from '../../services/indexedDB';
import { logger } from '../../utils/logger';
import PrimaryButton from '../atoms/PrimaryButton';

import { templates, Template } from './templates';
import './styles.scss';

// Memoized template card component to prevent unnecessary re-renders
const TemplateCard = memo(
  ({
    template,
    isSelected,
    onSelect,
  }: {
    template: Template;
    isSelected: boolean;
    onSelect: (templateId: string) => void;
  }) => {
    const handleClick = useCallback(() => {
      onSelect(template.id);
    }, [template.id, onSelect]);

    return (
      <div
        className={`template-card ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
      >
        <div className="template-thumbnail">
          <img
            src={template.previewImage}
            alt={template.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="template-info">
          <span className={`template-price ${template.isFree ? 'free' : ''}`}>
            {template.price}
          </span>
        </div>
        {isSelected && (
          <div className="selected-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [data, setData] = useState<any>(null);

  // Memoized handler to prevent recreation on every render
  const handleTemplateSelect = useCallback((templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  }, []);

  useEffect(() => {
    // Load biodata data from localStorage
    const savedData = localStorage.getItem('biodataData');
    if (!savedData) {
      // If no data, redirect back to form
      navigate('/form');
      return;
    }

    // Parse and set the data
    try {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    } catch (error) {
      logger.error('Failed to parse biodata data:', error);
      navigate('/form');
      return;
    }

    // Load image from IndexedDB
    getImageFromDB()
      .then((result) => {
        if (result) {
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

  const handleGenerateBiodata = () => {
    // Navigate to PDF viewer with selected template
    navigate(`/template/${selectedTemplate.id}`);
  };

  const TemplateComponent = selectedTemplate.component;

  // Show loading state while data is being loaded
  if (!data) {
    return (
      <div className="template-selection-container">
        <div className="preview-section">
          <h2 className="preview-title">Preview</h2>
          <div
            className="pdf-preview-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading...</p>
          </div>
        </div>
        <div className="template-selection-section">
          <div className="template-selection-header">
            <button className="close-button" onClick={() => navigate('/form')}>
              ✕
            </button>
            <h2 className="selection-title">Select Template</h2>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
            }}
          >
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Loading templates...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="template-selection-container">
      <div className="preview-section">
        <h2 className="preview-title">Preview</h2>
        <div className="pdf-preview-wrapper">
          <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
            <TemplateComponent data={data} image={croppedImage} />
          </PDFViewer>
        </div>
      </div>

      <div className="template-selection-section">
        <div className="template-selection-header">
          <button className="close-button" onClick={() => navigate('/form')}>
            ✕
          </button>
          <h2 className="selection-title">Select Template</h2>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate.id === template.id}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>

        <div className="generate-button-wrapper">
          <PrimaryButton onClick={handleGenerateBiodata}>
            Generate Biodata
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
