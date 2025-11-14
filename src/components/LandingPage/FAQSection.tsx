import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need design skills to use this biodata maker?',
    answer:
      'No design skills required! Our biodata maker is designed to be simple and intuitive. Just fill in your details, choose a template, and download your professionally designed biodata.',
  },
  {
    question: 'Can I add a profile photo to my biodata?',
    answer:
      'Yes, you can add one profile photo to your biodata. The photo will be automatically positioned and formatted according to the template you choose.',
  },
  {
    question: 'Is registration required to create a biodata?',
    answer:
      'No signup or registration is needed! You can start creating your biodata immediately and download it as a PDF without creating an account.',
  },
  {
    question: 'What format will I receive my biodata in?',
    answer:
      'Your biodata will be generated as a high-quality PDF file that you can download instantly. The PDF can be printed or shared digitally.',
  },
  {
    question: 'Can I edit my biodata after downloading?',
    answer:
      'Currently, editing after download is not possible. However, you can create a new biodata anytime with updated information. We recommend reviewing all details before downloading.',
  },
  {
    question: 'Can I customize the fields in my biodata?',
    answer:
      'Yes! You have full control to add, delete, or rename fields according to your requirements. Our platform is fully personalizable to match your needs.',
  },
  {
    question: 'Are templates available for different communities?',
    answer:
      'Yes, we offer templates suitable for various communities including Hindu, Muslim, Sikh, and Christian matrimonial formats.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'Our platform supports multiple languages including Hindi, English, Marathi, Gujarati, and several other regional languages.',
  },
  {
    question: 'Is this service free?',
    answer:
      'Yes, creating and downloading your biodata is completely free. There are no hidden charges or premium features.',
  },
  {
    question: 'How long does it take to create a biodata?',
    answer:
      'With our streamlined process, you can create and download your biodata in just 5-10 minutes!',
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({ className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`faq-section ${className}`}>
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
