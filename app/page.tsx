import { Hero } from '@/components/home/hero';
import { EventCategories } from '@/components/home/event-categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Testimonials } from '@/components/home/testimonials';
import { ProcessSteps } from '@/components/home/process-steps';
import { BlogTeaser } from '@/components/home/blog-teaser';

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <EventCategories />
      <FeaturedProducts />
      <ProcessSteps />
      <Testimonials />
      <BlogTeaser />
    </div>
  );
}