"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWishlist } from '@/contexts/wishlist-context';

const products = [
  {
    id: 1,
    name: 'Carte de mariage élégante',
    description: 'Design sophistiqué avec dorure à chaud',
    price: 15,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 127,
    category: 'Cartes',
    event: 'Mariage',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Dragées personnalisées',
    description: 'Boîtes élégantes avec vos noms gravés',
    price: 8,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 89,
    category: 'Dragées',
    event: 'Mariage',
    badge: 'Nouveau'
  },
  {
    id: 3,
    name: 'Tableau personnalisé',
    description: 'Impression haute qualité sur toile',
    price: 35,
    image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5.0,
    reviews: 203,
    category: 'Tableaux',
    event: 'Tous',
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'Faire-part baby shower',
    description: 'Designs adorables pour annoncer bébé',
    price: 12,
    image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 156,
    category: 'Cartes',
    event: 'Baby Shower',
    badge: null
  }
];

export function FeaturedProducts() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos produits les plus populaires
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les créations préférées de nos clients, personnalisables selon vos goûts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="block">
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      onClick={(e) => handleWishlistToggle(product, e)}
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
                        À partir de {product.price}€
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
            </motion.div>
          ))}
        </div>

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