"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/contexts/wishlist-context';
import Image from 'next/image';

import { Product } from '@/types/product';

interface FeaturedProductCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
        <div className="relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            width={100}
            height={100}
          />
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-teal-600">
              {product.badge}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors ${
              isInWishlist(product.id) 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-600 hover:text-red-500'
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-teal-600">
              À partir de {product.basePrice}€
            </span>
            <Button 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/products/${product.id}`;
              }}
            >
              Personnaliser
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
