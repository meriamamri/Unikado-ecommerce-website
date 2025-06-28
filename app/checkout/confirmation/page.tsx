"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar, 
  Package, 
  CreditCard,
  ArrowRight,
  Home,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

// Mock order data - in real app, this would come from API
const orderData = {
  orderNumber: 'UK123456',
  status: 'confirmed',
  paymentStatus: 'partial', // partial, completed
  createdAt: new Date().toISOString(),
  estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  customer: {
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com'
  },
  billing: {
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    address: '123 Rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  },
  items: [
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
  ],
  pricing: {
    subtotal: 1550,
    discount: 0,
    shipping: 0,
    tax: 310,
    total: 1860,
    paidAmount: 558, // 30%
    remainingAmount: 1302 // 70%
  }
};

const orderSteps = [
  { 
    id: 'confirmed', 
    title: 'Commande confirmée', 
    description: 'Votre commande a été reçue et confirmée',
    completed: true 
  },
  { 
    id: 'design', 
    title: 'Création du design', 
    description: 'Nous créons votre design personnalisé',
    completed: false,
    current: true 
  },
  { 
    id: 'preview', 
    title: 'Aperçu envoyé', 
    description: 'Validation de votre design',
    completed: false 
  },
  { 
    id: 'production', 
    title: 'Production', 
    description: 'Fabrication de votre commande',
    completed: false 
  },
  { 
    id: 'shipped', 
    title: 'Expédié', 
    description: 'Votre commande est en route',
    completed: false 
  },
  { 
    id: 'delivered', 
    title: 'Livré', 
    description: 'Commande livrée avec succès',
    completed: false 
  }
];

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || orderData.orderNumber;
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  ['bg-teal-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500'][Math.floor(Math.random() * 5)]
                }`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Commande confirmée !
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Merci pour votre confiance. Votre commande #{orderNumber} a été reçue et est en cours de traitement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Confirmation envoyée par email</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Livraison estimée : {formatDate(orderData.estimatedDelivery)}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-teal-600" />
                    Suivi de commande
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderSteps.map((step, index) => (
                      <div key={step.id} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? 'bg-green-600 text-white' :
                          step.current ? 'bg-teal-600 text-white' :
                          'bg-gray-200 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          {step.current && (
                            <Badge className="mt-1 bg-teal-600">En cours</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Détails de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary">{item.customization.eventType}</Badge>
                          <Badge variant="outline">
                            {item.customization.brideName} & {item.customization.groomName}
                          </Badge>
                          <Badge variant="outline">{item.customization.theme}</Badge>
                          <Badge variant="outline">{item.customization.color}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Quantité: {item.quantity}
                          </span>
                          <span className="font-semibold text-teal-600">
                            {(item.price * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-teal-50 to-purple-50 border-0">
                <CardHeader>
                  <CardTitle className="text-teal-700">Prochaines étapes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Création du design</h4>
                      <p className="text-sm text-gray-600">
                        Notre équipe créative travaille sur votre design personnalisé (2-3 jours)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Aperçu pour validation</h4>
                      <p className="text-sm text-gray-600">
                        Vous recevrez un aperçu par email pour validation avant production
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Production et livraison</h4>
                      <p className="text-sm text-gray-600">
                        Après validation, production (5-7 jours) puis expédition
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Commande #</span>
                    <span className="font-mono">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>{formatDate(orderData.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="text-xs">{orderData.customer.email}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{orderData.pricing.subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{orderData.pricing.shipping === 0 ? 'Gratuite' : `${orderData.pricing.shipping.toFixed(2)}€`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{orderData.pricing.tax.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{orderData.pricing.total.toFixed(2)}€</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Paiement reçu</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Acompte (30%)</span>
                      <span className="font-semibold">{orderData.pricing.paidAmount.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Solde restant</span>
                      <span>{orderData.pricing.remainingAmount.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href={`/orders/${orderNumber}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Suivre ma commande
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la facture
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contacter le support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Card className="bg-gradient-to-br from-teal-500 to-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Besoin d'autre chose ?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Découvrez nos autres produits personnalisables
                </p>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/products">
                      Continuer mes achats
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/20" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Retour à l'accueil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}