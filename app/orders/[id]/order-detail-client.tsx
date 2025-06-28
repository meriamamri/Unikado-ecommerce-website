"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Package, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Clock,
  Download,
  Mail,
  Phone,
  MapPin,
  Eye,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReviewModal } from '@/components/reviews/review-modal';

const orderSteps = [
  { 
    id: 'confirmed', 
    title: 'Commande confirmée', 
    description: 'Votre commande a été reçue et confirmée'
  },
  { 
    id: 'design', 
    title: 'Création du design', 
    description: 'Nous créons votre design personnalisé'
  },
  { 
    id: 'preview', 
    title: 'Aperçu envoyé', 
    description: 'Validation de votre design'
  },
  { 
    id: 'production', 
    title: 'Production', 
    description: 'Fabrication de votre commande'
  },
  { 
    id: 'shipped', 
    title: 'Expédié', 
    description: 'Votre commande est en route'
  },
  { 
    id: 'delivered', 
    title: 'Livré', 
    description: 'Commande livrée avec succès'
  }
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'confirmed':
      return { label: 'Confirmée', color: 'bg-blue-600', step: 0 };
    case 'design':
      return { label: 'Design en cours', color: 'bg-purple-600', step: 1 };
    case 'preview':
      return { label: 'Aperçu envoyé', color: 'bg-orange-600', step: 2 };
    case 'in_production':
      return { label: 'En production', color: 'bg-yellow-600', step: 3 };
    case 'shipped':
      return { label: 'Expédiée', color: 'bg-indigo-600', step: 4 };
    case 'delivered':
      return { label: 'Livrée', color: 'bg-green-600', step: 5 };
    default:
      return { label: 'Inconnue', color: 'bg-gray-600', step: 0 };
  }
};

const getPaymentStatusInfo = (status: string) => {
  switch (status) {
    case 'partial':
      return { label: 'Acompte reçu', color: 'bg-orange-600' };
    case 'completed':
      return { label: 'Payée', color: 'bg-green-600' };
    case 'pending':
      return { label: 'En attente', color: 'bg-yellow-600' };
    default:
      return { label: 'Inconnue', color: 'bg-gray-600' };
  }
};

interface OrderDetailClientProps {
  order: any;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReviewClick = (product: any) => {
    setSelectedProduct(product);
    setReviewModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const paymentInfo = getPaymentStatusInfo(order.paymentStatus);
  const isDelivered = order.status === 'delivered';

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
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à mon compte
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Commande #{order.orderNumber}
              </h1>
              <p className="text-gray-600">
                Passée le {formatDate(order.createdAt)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Badge className={statusInfo.color}>
                {statusInfo.label}
              </Badge>
              <Badge className={paymentInfo.color}>
                {paymentInfo.label}
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
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
                    {orderSteps.map((step, index) => {
                      const isCompleted = index <= statusInfo.step;
                      const isCurrent = index === statusInfo.step;
                      
                      return (
                        <div key={step.id} className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted ? 'bg-green-600 text-white' :
                            isCurrent ? 'bg-teal-600 text-white' :
                            'bg-gray-200 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                            {isCurrent && (
                              <Badge className="mt-1 bg-teal-600">En cours</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {order.tracking && order.status === 'shipped' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Informations de livraison</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Transporteur :</strong> {order.tracking.carrier}</p>
                        <p><strong>Numéro de suivi :</strong> {order.tracking.trackingNumber}</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <a href={order.tracking.trackingUrl} target="_blank" rel="noopener noreferrer">
                            Suivre le colis
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}

                  {order.deliveredAt && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Livraison effectuée</h4>
                      <p className="text-sm text-green-700">
                        Livré le {formatDate(order.deliveredAt)}
                      </p>
                    </div>
                  )}
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
                  {order.items.map((item: any) => (
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
                          {item.customization.brideName && item.customization.groomName && (
                            <Badge variant="outline">
                              {item.customization.brideName} & {item.customization.groomName}
                            </Badge>
                          )}
                          {item.customization.babyName && (
                            <Badge variant="outline">
                              {item.customization.babyName}
                            </Badge>
                          )}
                          {item.customization.childName && (
                            <Badge variant="outline">
                              {item.customization.childName}
                            </Badge>
                          )}
                          {item.customization.celebrantName && (
                            <Badge variant="outline">
                              {item.customization.celebrantName}
                            </Badge>
                          )}
                          {item.customization.theme && (
                            <Badge variant="outline">{item.customization.theme}</Badge>
                          )}
                          {item.customization.color && (
                            <Badge variant="outline">{item.customization.color}</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Quantité: {item.quantity}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-teal-600">
                              {(item.price * item.quantity).toFixed(2)}€
                            </span>
                            {isDelivered && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReviewClick(item)}
                                className="ml-2"
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Laisser un avis
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Adresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Adresse de facturation</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.billing.firstName} {order.billing.lastName}</p>
                        <p>{order.billing.address}</p>
                        <p>{order.billing.postalCode} {order.billing.city}</p>
                        <p>{order.billing.country}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Adresse de livraison</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.shipping.firstName} {order.shipping.lastName}</p>
                        <p>{order.shipping.address}</p>
                        <p>{order.shipping.postalCode} {order.shipping.city}</p>
                        <p>{order.shipping.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
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
                    <span>Sous-total</span>
                    <span>{order.pricing.subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {order.pricing.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Remise</span>
                      <span>-{order.pricing.discount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{order.pricing.shipping === 0 ? 'Gratuite' : `${order.pricing.shipping.toFixed(2)}€`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{order.pricing.tax.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-teal-600">{order.pricing.total.toFixed(2)}€</span>
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
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la facture
                </Button>
                
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contacter le support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-to-br from-teal-50 to-purple-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Besoin d'aide ?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-teal-600" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-teal-600" />
                    <span>contact@unikado.fr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-teal-600" />
                    <span>Lun-Ven: 9h-18h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedProduct && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedProduct(null);
          }}
          orderNumber={order.orderNumber}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
}