import { FeaturedProductsHeader } from './FeaturedProductsHeader.server';
import { FeaturedProductsGrid } from './FeaturedProductsGrid.server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { products } from '@/lib/data/products';

export async function FeaturedProducts() {
  // In a real application, you would fetch products here
  // const products = await getFeaturedProducts(); 

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <FeaturedProductsHeader />
        <FeaturedProductsGrid products={products} />
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              Voir tous nos produits
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
