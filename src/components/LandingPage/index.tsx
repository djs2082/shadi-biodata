import FAQSection from './FAQSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';

import './styles.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            <h3>ShadiBiodata.com</h3>
          </a>
          <div className="navbar-links">
            <a href="#features" className="navbar-link">
              Features
            </a>
            <a href="#how-it-works" className="navbar-link">
              How It Works
            </a>
            <a href="#testimonials" className="navbar-link">
              Reviews
            </a>
            <a href="#faq" className="navbar-link">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Page Sections */}
      <HeroSection />
      <FeaturesSection className="section" />
      <HowItWorksSection className="section" />
      <TestimonialsSection className="section" />
      <FAQSection className="section" />

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Create Your Biodata?</h2>
          <p className="cta-subtitle">
            Join thousands of satisfied users who created their perfect marriage
            biodata
          </p>
          <a href="/form" className="cta-button">
            Get Started Now - It&apos;s Free!
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
