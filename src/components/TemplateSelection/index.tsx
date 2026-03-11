import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getImageFromDB } from '../../services/indexedDB';
import { logger } from '../../utils/logger';
import PrimaryButton from '../atoms/PrimaryButton';
import {
  initiatePayment,
  BIODATA_PRICING,
} from '../../services/paymentService';

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
    const [imageError, setImageError] = useState(false);

    const handleClick = useCallback(() => {
      onSelect(template.id);
    }, [template.id, onSelect]);

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div
        className={`template-card ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
      >
        <div className="template-thumbnail">
          {!imageError ? (
            <img
              src={template.previewImage}
              alt={template.name}
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="template-placeholder">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <p>{template.name}</p>
            </div>
          )}
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
  const [searchParams] = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [data, setData] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  // Check for download param (after successful payment)
  useEffect(() => {
    const shouldDownload = searchParams.get('download') === 'true';
    const paymentSuccess = sessionStorage.getItem('paymentSuccess') === 'true';

    if (shouldDownload && paymentSuccess && data) {
      handleDownloadPDF();
      // Clear the flags
      sessionStorage.removeItem('paymentSuccess');
      sessionStorage.removeItem('transactionId');
      // Remove the query param
      navigate('/select-template', { replace: true });
    }
  }, [searchParams, data]);

  const handleDownloadPDF = async () => {
    if (!data) return;

    setDownloading(true);
    try {
      const TemplateComponent = selectedTemplate.component;
      const blob = await pdf(
        <TemplateComponent data={data} image={croppedImage} />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `biodata-${selectedTemplate.id}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      logger.error('Failed to generate PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleGenerateBiodata = () => {
    // Check if template is free
    if (selectedTemplate.isFree) {
      handleDownloadPDF();
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const result = await initiatePayment({
        amount: BIODATA_PRICING.basic.price,
        customerName: data?.[0]?.data?.find(
          (f: any) => f.label === 'Full Name'
        )?.value,
      });

      if (result.success && result.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = result.redirectUrl;
      } else {
        alert(result.message || 'Failed to initiate payment');
      }
    } catch (error) {
      logger.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
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
          <PrimaryButton onClick={handleGenerateBiodata} disabled={downloading}>
            {downloading ? 'Downloading...' : 'Generate Biodata'}
          </PrimaryButton>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" onClick={closePaymentModal}>
          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closePaymentModal}>
              ✕
            </button>
            <div className="modal-header">
              <h2>Download Your Biodata</h2>
              <p>Complete payment to download your biodata in PDF format</p>
            </div>

            <div className="pricing-card">
              <div className="price-tag">
                <span className="currency">₹</span>
                <span className="amount">{BIODATA_PRICING.basic.price}</span>
              </div>
              <ul className="features-list">
                <li>✓ High-quality PDF download</li>
                <li>✓ Professional {selectedTemplate.name} template</li>
                <li>✓ Instant delivery</li>
                <li>✓ Print-ready format</li>
              </ul>
            </div>

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <span>Pay ₹{BIODATA_PRICING.basic.price}</span>
                  <span className="pay-icon">→</span>
                </>
              )}
            </button>

            <p className="secure-text">
              🔒 Secure payment powered by PhonePe
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelection;
