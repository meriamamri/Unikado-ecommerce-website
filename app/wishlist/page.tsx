"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useWishlist } from '@/contexts/wishlist-context';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const addToCart = (id: number) => {
    // In real app, this would add to cart state/API
    toast.success('Produit ajouté au panier !');
  };

  const shareWishlist = () => {
    // In real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    toast.success('Lien de la liste copié dans le presse-papiers !');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Votre liste de souhaits est vide
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Découvrez nos produits et ajoutez vos favoris à votre liste
              </p>
              <Button asChild size="lg">
                <Link href="/products">
                  Découvrir nos produits
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Ma liste de souhaits
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} produit{wishlistItems.length > 1 ? 's' : ''} sauvegardé{wishlistItems.length > 1 ? 's' : ''}
              </p>
            </div>
            
            <Button variant="outline" onClick={shareWishlist}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager ma liste
            </Button>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <Badge className="absolute top-2 left-2 bg-teal-600">
                      {item.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-teal-600">
                      À partir de {item.price}€
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.event}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => addToCart(item.id)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Ajouter
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/products/${item.id}`}>
                        Voir
                      </Link>
                    </Button>
                  </div>

                  {item.dateAdded && (
                    <p className="text-xs text-gray-500">
                      Ajouté le {new Date(item.dateAdded).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              Continuer mes achats
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}