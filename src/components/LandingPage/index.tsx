import FAQSection from './FAQSection';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';

import './styles.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
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
    </div>
  );
};

export default LandingPage;
