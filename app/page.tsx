import { Hero } from '@/components/home/Hero';
import { EventCategories } from '@/components/home/EventCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts.client';
import { OrderTracking } from '@/components/home/order-tracking';
import { Testimonials } from '@/components/home/Testimonials.server';
import {ProcessSteps} from '@/components/home/processSteps.server';
//import { BlogTeaser } from '@/components/home/blog-teaser';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <EventCategories />
      <FeaturedProducts />
      <OrderTracking />
      <ProcessSteps />
      <Testimonials />
      {/* <BlogTeaser /> */}
    </div>
  );
}
