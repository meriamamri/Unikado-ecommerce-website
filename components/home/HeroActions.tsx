import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
        <Link href="/custom">
          Commencer la personnalisation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link href="/products">
          Voir nos produits
        </Link>
      </Button>
    </div>
  );
}
