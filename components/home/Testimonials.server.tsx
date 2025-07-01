import { TestimonialsHeader } from './TestimonialsHeader.server';
import { TestimonialsGrid } from './TestimonialsGrid.server';
import { TestimonialsSummary } from './TestimonialsSummary.server';
import { testimonials } from '@/lib/constants/testimonials';

export function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-purple-50">
      <div className="container mx-auto px-4">
        <TestimonialsHeader />
        <TestimonialsGrid testimonials={testimonials} />
        <TestimonialsSummary />
      </div>
    </section>
  );
}
