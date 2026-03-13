import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const features = [
  {
    icon: '⚡',
    title: 'Quick & Easy Creation',
    description:
      "Build a complete matrimonial biodata in minutes using our simple, guided form. No technical skills needed — just fill in your details and you're done.",
  },
  {
    icon: '🎨',
    title: 'Beautiful Templates',
    description:
      'Choose from a curated collection of modern and traditional layouts. Every template is designed specifically for matrimonial biodatas to make the best first impression.',
  },
  {
    icon: '✏️',
    title: 'Fully Customizable',
    description:
      "Add, remove, or rename any field to suit your needs. Whether it's horoscope details, family background, or personal interests — you have full control.",
  },
  {
    icon: '🌐',
    title: 'Multi-Language Support',
    description:
      'Create your biodata in Hindi, English, Marathi, Gujarati, and more. Reach families across regions and languages with ease.',
  },
  {
    icon: '🎭',
    title: 'Multiple Design Options',
    description:
      'Personalize colors, fonts, and layout styles to match your taste. Make your biodata truly yours with rich design customization.',
  },
  {
    icon: '📄',
    title: 'Export as PDF',
    description:
      'Download a clean, print-ready PDF with a single click. Share it digitally or print it for proposals — it looks great either way.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description:
      'Works seamlessly on phones and tablets. Create or review your biodata on the go — no desktop required.',
  },
  {
    icon: '🖼️',
    title: 'Profile Photo Upload',
    description:
      'Upload and crop your profile photo directly in the app. Your biodata gets a polished, professional look with the right photo placement.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description:
      'Your personal information belongs to you. All data is stored locally on your device and is never shared with any server, so there is no risk of a data breach. Create and manage your biodata with complete confidence.',
  },
];

const Features: React.FC = () => {
  return (
    <div className="fp-page">
      {/* Hero */}
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <span className="fp-badge">Everything you need</span>
          <h1 className="fp-hero-title">
            Powerful Features for the{' '}
            <span className="fp-highlight">Perfect Biodata</span>
          </h1>
          <p className="fp-hero-subtitle">
            ShadiBiodata.com is packed with tools to help you create a
            beautiful, personalised matrimonial biodata — quickly and
            effortlessly.
          </p>
          <Link to="/form" className="fp-cta-btn">
            Create Your Biodata &rarr;
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="fp-section">
        <div className="fp-grid">
          {features.map((f, i) => (
            <div className="fp-card" key={i}>
              <div className="fp-card-icon">{f.icon}</div>
              <h3 className="fp-card-title">{f.title}</h3>
              <p className="fp-card-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fp-cta-section">
        <div className="fp-cta-inner">
          <h2 className="fp-cta-title">Ready to create your biodata?</h2>
          <p className="fp-cta-subtitle">
            Join thousands of families who trust ShadiBiodata.com for their
            matrimonial journey.
          </p>
          <Link to="/form" className="fp-cta-btn fp-cta-btn--white">
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
