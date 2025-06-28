"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Truck, Shield } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Mock cart data - in real app, this would come from state management or API
const initialCartItems = [
  {
    id: 1,
    name: 'Carte de mariage élégante',
    description: 'Design sophistiqué avec dorure à chaud',
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 15,
    quantity: 50,
    customization: {
      eventType: 'Mariage',
      brideName: 'Marie Dubois',
      groomName: 'Thomas Martin',
      eventDate: '2024-06-15',
      theme: 'Classique',
      color: 'Blanc cassé'
    }
  },
  {
    id: 2,
    name: 'Dragées personnalisées',
    description: 'Boîtes élégantes avec vos noms gravés',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 8,
    quantity: 100,
    customization: {
      eventType: 'Mariage',
      brideName: 'Marie Dubois',
      groomName: 'Thomas Martin',
      theme: 'Vintage',
      color: 'Rose poudré'
    }
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success('Produit retiré du panier');
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      toast.success('Code promo appliqué ! -10% sur votre commande');
    } else {
      toast.error('Code promo invalide');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode.toLowerCase() === 'welcome10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.90;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Votre panier est vide
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Découvrez nos produits personnalisables et créez des cadeaux uniques
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Votre panier
          </h1>
          <p className="text-gray-600">
            {cartItems.length} produit{cartItems.length > 1 ? 's' : ''} personnalisé{cartItems.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>

                        {/* Customization Details */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {item.customization.eventType}
                          </Badge>
                          {item.customization.brideName && (
                            <Badge variant="outline">
                              {item.customization.brideName} & {item.customization.groomName}
                            </Badge>
                          )}
                          {item.customization.theme && (
                            <Badge variant="outline">
                              {item.customization.theme}
                            </Badge>
                          )}
                          {item.customization.color && (
                            <Badge variant="outline">
                              {item.customization.color}
                            </Badge>
                          )}
                        </div>

                        {/* Quantity and Price Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Quantité:</span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 h-8 text-center"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                {item.price}€ × {item.quantity}
                              </div>
                              <div className="text-lg font-semibold text-teal-600">
                                {(item.price * item.quantity).toFixed(2)}€
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Remise (WELCOME10)</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-teal-600">{total.toFixed(2)}€</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-gray-600">
                    Livraison gratuite dès 100€ d'achat
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Code promo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Appliquer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">
                Procéder au paiement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Trust Indicators */}
            <Card className="bg-gradient-to-br from-teal-50 to-purple-50 border-0">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Gift className="h-4 w-4 text-teal-600" />
                  <span>Personnalisation incluse</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-teal-600" />
                  <span>Livraison rapide 5-7 jours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-teal-600" />
                  <span>Paiement sécurisé</span>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">
                Continuer mes achats
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}