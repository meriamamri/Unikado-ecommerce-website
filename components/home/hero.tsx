import { HeroBadge } from './HeroBadge';
import { HeroHeading } from './HeroHeading';
import { HeroDescription } from './HeroDescription';
import { HeroActions } from './HeroActions';
import { HeroFeatures } from './HeroFeatures';
import { HeroProductCard } from './HeroProductCard';
import { HeroDecorations } from './HeroDecorations';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <HeroBadge />
              <HeroHeading />
              <HeroDescription />
            </div>
            <HeroActions />
            <HeroFeatures />
          </div>

          <div className="relative">
            <HeroProductCard />
            <HeroDecorations />
          </div>
        </div>
      </div>
    </section>
  );
}
