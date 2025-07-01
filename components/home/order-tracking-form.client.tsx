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

interface OrderTrackingFormProps {
  initialOrderNumber: string;
  setOrderNumber: (orderNumber: string) => void;
}

export function OrderTrackingForm({ initialOrderNumber, setOrderNumber }: OrderTrackingFormProps) {
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!initialOrderNumber.trim()) {
      toast.error('Veuillez saisir un numéro de commande');
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if order exists (in real app, this would be an API call)
      const validOrders = ['UK496266', 'UK123455', 'UK867012', 'UK138421', 'UK346511'];
      
      if (validOrders.includes(initialOrderNumber.toUpperCase())) {
        toast.success('Commande trouvée ! Redirection...');
        router.push(`/orders/${initialOrderNumber.toUpperCase()}`);
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
                  value={initialOrderNumber}
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
  );
}
