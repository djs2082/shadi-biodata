import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import './HowItWorks.css';
import step1 from './../images/howItWorks/step1.png';
import step10 from './../images/howItWorks/step10.png';
import step11 from './../images/howItWorks/step11.png';
import step12 from './../images/howItWorks/step12.png';
import step2 from './../images/howItWorks/step2.png';
import step3 from './../images/howItWorks/step3.png';
import step4 from './../images/howItWorks/step4.png';
import step5 from './../images/howItWorks/step5.png';
import step6 from './../images/howItWorks/step6.png';
import step7 from './../images/howItWorks/step7.png';
import step8 from './../images/howItWorks/step8.png';
import step9 from './../images/howItWorks/step9.png';

interface Step {
  title: string;
  desc: string;
  tip?: string;
  image?: string;
}

interface Phase {
  phase: string;
  color: string;
  steps: Step[];
}

const phases: Phase[] = [
  {
    phase: 'Get Started',
    color: '#dc2626',
    steps: [
      {
        title: 'Click "Create My Biodata"',
        desc: 'Head to the homepage and click the "Create My Biodata" button to begin a fresh session. No registration or sign-up is required — you can start building right away.',
        tip: 'Your data is stored locally on your browser, so it stays private.',
        image: step1,
      },
      {
        title: 'Upload a Profile Picture',
        desc: 'Choose a clear, recent photo of yourself. A good photo makes your biodata look professional and leaves a lasting impression on prospective families.',
        tip: 'Use a well-lit, front-facing photo for the best results.',
        image: step2,
      },
      {
        title: 'Crop to Your Preference',
        desc: 'Use the in-app cropping tool to frame your photo perfectly. You can zoom, pan, and adjust the crop area to get exactly the look you want before it appears on the biodata.',
        image: step3,
      },
    ],
  },
  {
    phase: 'Fill In Your Details',
    color: '#7c3aed',
    steps: [
      {
        title: 'Enter Your Personal Information',
        desc: 'Fill in your name, date of birth, height, complexion, religion, caste, mother tongue, and any other personal details. Each field is clearly labelled to guide you through the process.',
        tip: 'Complete all fields for a more impactful biodata.',
        image: step4,
      },
      {
        title: 'Fill in Family Information',
        desc: 'Add details about your parents, siblings, and family background. Many families consider this an important part of the biodata, so provide as much detail as you are comfortable sharing.',
        image: step5,
      },
      {
        title: 'Add Contact Details',
        desc: "Add Contact Person's Name, your phone number, email address etc. This section helps families contact the right person for proposals and inquiries.",
        image: step6,
      },
    ],
  },
  {
    phase: 'Customise the Fields',
    color: '#0891b2',
    steps: [
      {
        title: 'Add Custom Fields',
        desc: 'Need to include something not in the default form? Click "Add Field" to create a custom entry — such as hobbies, expectations, gotras, or anything else that is relevant to you.',
        tip: 'Custom fields are great for making your biodata unique.',
        image: step7,
      },
      {
        title: 'Reorder Fields',
        desc: "Drag and drop Fields or Use Buttons to change their order. Want your Father's Name to appear before Mother's Name in personal info? No problem — arrange the biodata however you prefer.",
        image: step8,
      },
      {
        title: 'Remove Unnecessary Fields',
        desc: 'Delete any fields that are not applicable to you. Keeping the biodata focused and relevant ensures readers can quickly find the most important details.',
        image: step9,
      },
    ],
  },
  {
    phase: 'Choose & Download',
    color: '#16a34a',
    steps: [
      {
        title: 'Submit the Form',
        desc: 'Once you are happy with all the details, click "Submit". Your information is saved and you are taken to the template selection screen.',
        tip: 'You can always go back and edit details before downloading.',
        image: step10,
      },
      {
        title: 'Pick a Template',
        desc: 'Browse through our collection of beautiful templates — modern, traditional, minimalist, and more. Preview each one to see how your details will look before making a choice.',
        image: step11,
      },
      {
        title: 'Complete Purchase (if applicable)',
        desc: 'Premium templates require a one-time payment. The process is quick and secure. Free templates are available at no cost and can be downloaded immediately.',
        image: step12,
      },
      {
        title: 'Download Your Biodata!',
        desc: 'Your biodata is generated as a high-quality PDF, ready to download instantly. Share it via WhatsApp, email, or print it for in-person meetings. Congratulations!',
        tip: 'The PDF is print-ready at A4 size.',
      },
    ],
  },
];

/* ── Lightbox ── */
interface LightboxProps {
  src: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Refs so touch handlers always read the latest zoom without needing to re-register
  const zoomRef = useRef(1);
  const pinchRef = useRef({ initialDistance: 0, initialZoom: 1 });

  // Keep zoomRef in sync with state
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Non-passive wheel + touch listeners (passive:false required for preventDefault)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    /* Desktop – scroll to zoom */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => {
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        return Math.min(4, Math.max(0.5, parseFloat((z + delta).toFixed(2))));
      });
    };

    /* Mobile – pinch to zoom */
    const pinchDist = (t: TouchList) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchRef.current.initialDistance = pinchDist(e.touches);
        pinchRef.current.initialZoom = zoomRef.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const scale = pinchDist(e.touches) / pinchRef.current.initialDistance;
        const next = pinchRef.current.initialZoom * scale;
        setZoom(Math.min(4, Math.max(0.5, parseFloat(next.toFixed(2)))));
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return createPortal(
    <div className="lb-backdrop" onClick={onClose}>
      {/* Close button */}
      <button className="lb-close" onClick={onClose} aria-label="Close preview">
        ✕
      </button>

      {/* Image container — stop click/touch propagation so backdrop does not close */}
      <div
        ref={wrapRef}
        className="lb-img-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          className="lb-img"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
          alt="Step preview"
        />
      </div>

      {/* Context-aware hint */}
      <div className="lb-hint">
        {isTouchDevice
          ? 'Pinch to zoom · Tap outside to close'
          : 'Scroll to zoom · Click outside to close'}
        {zoom !== 1 && (
          <button
            className="lb-reset"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(1);
            }}
          >
            Reset zoom
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

/* ── Page ── */
const HowItWorks: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  let stepCounter = 0;

  return (
    <div className="hiw-page">
      {/* Hero */}
      <div className="hiw-hero">
        <div className="hiw-hero-inner">
          <span className="hiw-badge">Step-by-step guide</span>
          <h1 className="hiw-hero-title">
            How to Create Your{' '}
            <span className="hiw-highlight">Marriage Biodata</span>
          </h1>
          <p className="hiw-hero-subtitle">
            From start to download in just a few minutes. Follow these simple
            steps and get a beautiful, share-ready biodata.
          </p>
          <Link to="/form" className="hiw-cta-btn">
            Start Creating Now &rarr;
          </Link>
        </div>
      </div>

      {/* Phases */}
      <div className="hiw-content">
        {phases.map((phase, pi) => (
          <div className="hiw-phase" key={pi}>
            <div className="hiw-phase-header">
              <span
                className="hiw-phase-dot"
                style={{ background: phase.color }}
              />
              <h2 className="hiw-phase-title" style={{ color: phase.color }}>
                Phase {pi + 1}: {phase.phase}
              </h2>
            </div>

            <div className="hiw-steps">
              {phase.steps.map((step, si) => {
                stepCounter++;
                const num = stepCounter;
                return (
                  <div className="hiw-step" key={si}>
                    <div className="hiw-step-left">
                      <div
                        className="hiw-step-num"
                        style={{ background: phase.color }}
                      >
                        {num}
                      </div>
                      {si < phase.steps.length - 1 && (
                        <div
                          className="hiw-connector"
                          style={{ borderColor: phase.color }}
                        />
                      )}
                    </div>

                    <div className="hiw-step-body">
                      <h3 className="hiw-step-title">{step.title}</h3>
                      <p className="hiw-step-desc">{step.desc}</p>
                      {step.tip && (
                        <div className="hiw-tip">
                          <span className="hiw-tip-icon">💡</span>
                          <span>{step.tip}</span>
                        </div>
                      )}
                      {step.image && (
                        <div
                          className="hiw-screenshot"
                          onClick={() => openLightbox(step.image!)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && openLightbox(step.image!)
                          }
                          aria-label={`Enlarge screenshot for step ${num}`}
                        >
                          <img
                            src={step.image}
                            alt={`Step ${num}: ${step.title}`}
                          />
                          <div className="hiw-screenshot-overlay">
                            <span className="hiw-zoom-icon">🔍</span>
                            <span>Tap to enlarge</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="hiw-cta-section">
        <div className="hiw-cta-inner">
          <h2 className="hiw-cta-title">Ready to get started?</h2>
          <p className="hiw-cta-subtitle">
            It takes just a few minutes to create a polished, professional
            biodata.
          </p>
          <Link to="/form" className="hiw-cta-btn hiw-cta-btn--white">
            Create My Biodata
          </Link>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={closeLightbox} />}
    </div>
  );
};

export default HowItWorks;
