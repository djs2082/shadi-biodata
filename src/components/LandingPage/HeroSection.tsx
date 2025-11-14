import { useNavigate } from 'react-router-dom';

import PrimaryButton from '../atoms/PrimaryButton';
import TodaysCountShow from '../BioDataForm/components/TodaysCountShow';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <section className={`hero-section ${className}`}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">The Ultimate Marriage Biodata Maker</h1>
          <p className="hero-subtitle">
            Create beautiful biodata for marriage with just a few clicks! Easy
            to use, fully customizable, elegantly designed
          </p>
          <PrimaryButton
            className="hero-cta-button"
            onClick={() => navigate('/form')}
          >
            Create My Biodata
          </PrimaryButton>
          <TodaysCountShow />
        </div>
        <div className="hero-image-container">
          <img
            src="/hero_image.webp"
            alt="Marriage Biodata Templates"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
