import { TestimonialCard } from './TestimonialCard.client';

interface TestimonialsGridProps {
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
    event: string;
  }[];
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} index={index} />
      ))}
    </div>
  );
}
