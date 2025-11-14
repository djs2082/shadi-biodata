interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesSectionProps {
  className?: string;
}

const features: Feature[] = [
  {
    title: 'Easy to use',
    description:
      'No Sign up/Registration required. Enter details, choose template, download PDF instantly',
  },
  {
    title: 'Customization made simple',
    description:
      'Full control over fields; ability to add, delete, or rename existing sections',
  },
  {
    title: 'Great Looking Templates',
    description:
      'Unique, clean and perfect templates designed specifically for matrimonial biodata',
  },
  {
    title: 'Multi-language support',
    description:
      'Create biodata in Hindi, English, Marathi, Gujarati, and many other languages',
  },
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  className = '',
}) => {
  return (
    <section className={`features-section ${className}`}>
      <div className="features-container">
        <h2 className="features-title">
          Why Choose Our Marriage Biodata Maker
        </h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
