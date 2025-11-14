interface Testimonial {
  name: string;
  date: string;
  rating: number;
  review: string;
  platform?: string;
}

interface TestimonialsSectionProps {
  className?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    date: 'Jan 15, 2025',
    rating: 5,
    review:
      'Excellent service! Created my biodata in minutes. The templates are beautiful and very professional. Highly recommended!',
    platform: 'Google',
  },
  {
    name: 'Rahul Patel',
    date: 'Jan 10, 2025',
    rating: 5,
    review:
      'Very easy to use. No registration needed and completely free. The PDF quality is excellent.',
    platform: 'Google',
  },
  {
    name: 'Sneha Desai',
    date: 'Jan 8, 2025',
    rating: 5,
    review:
      'Seamless work and less time consuming, just have your details ready for input and off you go choosing your desired template',
    platform: 'Google',
  },
  {
    name: 'Amit Kumar',
    date: 'Jan 5, 2025',
    rating: 5,
    review:
      'Great variety of templates. I found the perfect one for my needs. The customization options are fantastic!',
    platform: 'Trustpilot',
  },
  {
    name: 'Kavita Joshi',
    date: 'Dec 28, 2024',
    rating: 5,
    review:
      'Simple, elegant, and effective. This is exactly what I was looking for. Thank you for this wonderful tool!',
    platform: 'Google',
  },
  {
    name: 'Vikram Singh',
    date: 'Dec 20, 2024',
    rating: 4,
    review:
      'Very good service. Templates are nice and the process is straightforward. Would love to see more customization options.',
    platform: 'Google',
  },
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  className = '',
}) => {
  return (
    <section className={`testimonials-section ${className}`}>
      <div className="testimonials-container">
        <h2 className="testimonials-title">Wall of Love</h2>
        <p className="testimonials-subtitle">
          See what our users are saying about us
        </p>
        <div className="testimonials-rating">
          <div className="rating-stars">{'★'.repeat(5)}</div>
          <p className="rating-text">4.6 stars from 1,347+ reviews</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="review-date">{testimonial.date}</p>
                  </div>
                </div>
                {testimonial.platform && (
                  <span className="review-platform">
                    {testimonial.platform}
                  </span>
                )}
              </div>
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
