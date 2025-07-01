"use client";

import { WishlistProvider } from '@/contexts/wishlist-context';
import { FeaturedProducts as FeaturedProductsServer } from './FeaturedProducts.server';

export function FeaturedProducts() {
  return (
    <WishlistProvider>
      <FeaturedProductsServer />
    </WishlistProvider>
  );
}
