interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  className?: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Enter your information',
    description:
      'Fill in your personal, family, and contact details. Add an optional profile photo',
  },
  {
    number: 2,
    title: 'Choose the template',
    description:
      'Select from a variety of professionally designed templates that match your style',
  },
  {
    number: 3,
    title: 'Download the PDF',
    description:
      'Receive a high-quality, downloadable PDF of your biodata instantly',
  },
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = '',
}) => {
  return (
    <section className={`how-it-works-section ${className}`}>
      <div className="how-it-works-container">
        <h2 className="how-it-works-title">
          Create your Perfect Marriage Biodata in Just 3 Easy Steps
        </h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
