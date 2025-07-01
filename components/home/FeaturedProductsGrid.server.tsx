import { motion } from 'framer-motion';
import { FeaturedProductCard } from './FeaturedProductCard.client';

import { Product } from '@/types/product';

interface FeaturedProductsGridProps {
  products: Product[];
}

export async function FeaturedProductsGrid({ products }: FeaturedProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <FeaturedProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
