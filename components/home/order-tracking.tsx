"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast.error('Veuillez saisir un numéro de commande');
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if order exists (in real app, this would be an API call)
      const validOrders = ['UK496266', 'UK123455', 'UK867012', 'UK138421', 'UK346511'];
      
      if (validOrders.includes(orderNumber.toUpperCase())) {
        toast.success('Commande trouvée ! Redirection...');
        router.push(`/orders/${orderNumber.toUpperCase()}`);
      } else {
        toast.error('Numéro de commande introuvable. Vérifiez votre saisie.');
      }
    } catch (error) {
      toast.error('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Suivez votre commande
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entrez votre numéro de commande pour suivre l'avancement de votre création personnalisée
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Order Tracking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-teal-50 to-purple-50 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Package className="h-6 w-6 mr-2 text-teal-600" />
                    Suivi de commande
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Numéro de commande</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="orderNumber"
                          type="text"
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          placeholder="Ex: UK123456"
                          className="pl-10"
                          disabled={isSearching}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Vous trouverez ce numéro dans votre email de confirmation
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Recherche en cours...
                        </>
                      ) : (
                        <>
                          Suivre ma commande
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-3">
                      Vous avez un compte ? Accédez à toutes vos commandes :
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/account">
                        Voir toutes mes commandes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Status Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Étapes de votre commande
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Commande confirmée</h4>
                      <p className="text-sm text-gray-600">Votre commande est reçue et validée</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Création du design</h4>
                      <p className="text-sm text-gray-600">Notre équipe travaille sur votre design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Aperçu envoyé</h4>
                      <p className="text-sm text-gray-600">Validation de votre design par email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Production & Livraison</h4>
                      <p className="text-sm text-gray-600">Fabrication puis expédition de votre commande</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-teal-500 to-purple-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">Besoin d'aide ?</h4>
                  <p className="text-sm opacity-90 mb-4">
                    Notre équipe est disponible pour répondre à vos questions
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Access for Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Démonstration</h4>
              <p className="text-sm text-gray-600 mb-4">
                Essayez avec ces numéros de commande de démonstration :
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['UK496266', 'UK123455', 'UK867012', 'UK138421'].map((orderNum) => (
                  <Button
                    key={orderNum}
                    variant="outline"
                    size="sm"
                    onClick={() => setOrderNumber(orderNum)}
                    className="font-mono"
                  >
                    {orderNum}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}