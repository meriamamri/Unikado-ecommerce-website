"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mock cart data - in real app, this would come from state management
const cartItems = [
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

const countries = [
  'France',
  'Belgique',
  'Suisse',
  'Luxembourg',
  'Monaco'
];

const paymentMethods = [
  { id: 'card', name: 'Carte bancaire', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', name: 'PayPal', icon: Shield, description: 'Paiement sécurisé avec PayPal' },
  { id: 'bank', name: 'Virement bancaire', icon: Lock, description: 'Paiement par virement (délai 2-3 jours)' }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'France',
    sameAsBilling: true
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; // Could be applied from cart
  const shipping = subtotal > 100 ? 0 : 9.90;
  const tax = subtotal * 0.20; // 20% TVA
  const total = subtotal - discount + shipping + tax;

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    if (section === 'billing') {
      setBillingData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'shipping') {
      setShippingData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return billingData.firstName && billingData.lastName && billingData.email && 
               billingData.address && billingData.city && billingData.postalCode;
      case 2:
        if (shippingData.sameAsBilling) return true;
        return shippingData.firstName && shippingData.lastName && shippingData.address && 
               shippingData.city && shippingData.postalCode;
      case 3:
        if (paymentData.method === 'card') {
          return paymentData.cardNumber && paymentData.expiryDate && 
                 paymentData.cvv && paymentData.cardName;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast.error('Veuillez remplir tous les champs obligatoires');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processPayment = async () => {
    if (!acceptTerms) {
      toast.error('Veuillez accepter les conditions générales de vente');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order number
      const orderNumber = `UK${Date.now().toString().slice(-6)}`;
      
      toast.success('Paiement effectué avec succès !');
      
      // Redirect to confirmation page with order details
      router.push(`/checkout/confirmation?order=${orderNumber}`);
      
    } catch (error) {
      toast.error('Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { number: 1, title: 'Facturation', icon: User },
    { number: 2, title: 'Livraison', icon: Truck },
    { number: 3, title: 'Paiement', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

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
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au panier
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Finaliser la commande
          </h1>
          <p className="text-gray-600">
            Sécurisé par SSL • Paiement en 30% d'acompte
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    isActive ? 'text-teal-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-teal-600 text-white' : 
                      isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Billing Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-teal-600" />
                      Informations de facturation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={billingData.firstName}
                          onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={billingData.lastName}
                          onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={billingData.email}
                          onChange={(e) => handleInputChange('billing', 'email', e.target.value)}
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={billingData.phone}
                          onChange={(e) => handleInputChange('billing', 'phone', e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise (optionnel)</Label>
                      <Input
                        id="company"
                        value={billingData.company}
                        onChange={(e) => handleInputChange('billing', 'company', e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={billingData.address}
                        onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                        placeholder="Numéro et nom de rue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address2">Complément d'adresse</Label>
                      <Input
                        id="address2"
                        value={billingData.address2}
                        onChange={(e) => handleInputChange('billing', 'address2', e.target.value)}
                        placeholder="Appartement, étage, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={billingData.city}
                          onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                          placeholder="Votre ville"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={billingData.postalCode}
                          onChange={(e) => handleInputChange('billing', 'postalCode', e.target.value)}
                          placeholder="75001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays *</Label>
                        <Select value={billingData.country} onValueChange={(value) => handleInputChange('billing', 'country', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-teal-600" />
                      Adresse de livraison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={shippingData.sameAsBilling}
                        onCheckedChange={(checked) => handleInputChange('shipping', 'sameAsBilling', checked as boolean)}
                      />
                      <Label htmlFor="sameAsBilling">
                        Utiliser la même adresse que la facturation
                      </Label>
                    </div>

                    {!shippingData.sameAsBilling && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="shippingFirstName">Prénom *</Label>
                            <Input
                              id="shippingFirstName"
                              value={shippingData.firstName}
                              onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                              placeholder="Prénom du destinataire"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="shippingLastName">Nom *</Label>
                            <Input
                              id="shippingLastName"
                              value={shippingData.lastName}
                              onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                              placeholder="Nom du destinataire"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shippingAddress">Adresse *</Label>
                          <Input
                            id="shippingAddress"
                            value={shippingData.address}
                            onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                            placeholder="Numéro et nom de rue"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shippingAddress2">Complément d'adresse</Label>
                          <Input
                            id="shippingAddress2"
                            value={shippingData.address2}
                            onChange={(e) => handleInputChange('shipping', 'address2', e.target.value)}
                            placeholder="Appartement, étage, etc."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="shippingCity">Ville *</Label>
                            <Input
                              id="shippingCity"
                              value={shippingData.city}
                              onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                              placeholder="Ville de livraison"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="shippingPostalCode">Code postal *</Label>
                            <Input
                              id="shippingPostalCode"
                              value={shippingData.postalCode}
                              onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                              placeholder="75001"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="shippingCountry">Pays *</Label>
                            <Select value={shippingData.country} onValueChange={(value) => handleInputChange('shipping', 'country', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map(country => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="orderNotes">Instructions de livraison (optionnel)</Label>
                      <Textarea
                        id="orderNotes"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Code d'accès, étage, instructions spéciales..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-teal-600" />
                      Mode de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs value={paymentData.method} onValueChange={(value) => handleInputChange('payment', 'method', value)}>
                      <TabsList className="grid w-full grid-cols-3">
                        {paymentMethods.map(method => {
                          const Icon = method.icon;
                          return (
                            <TabsTrigger key={method.id} value={method.id} className="flex items-center space-x-2">
                              <Icon className="h-4 w-4" />
                              <span className="hidden sm:inline">{method.name}</span>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      <TabsContent value="card" className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Numéro de carte *</Label>
                            <Input
                              id="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Date d'expiration *</Label>
                              <Input
                                id="expiryDate"
                                value={paymentData.expiryDate}
                                onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                                placeholder="MM/AA"
                                maxLength={5}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={paymentData.cvv}
                                onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nom sur la carte *</Label>
                            <Input
                              id="cardName"
                              value={paymentData.cardName}
                              onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                              placeholder="Nom tel qu'il apparaît sur la carte"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="space-y-4">
                        <div className="text-center py-8">
                          <Shield className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Paiement PayPal</h3>
                          <p className="text-gray-600">
                            Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="bank" className="space-y-4">
                        <div className="text-center py-8">
                          <Lock className="h-16 w-16 mx-auto text-green-600 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Virement bancaire</h3>
                          <p className="text-gray-600 mb-4">
                            Vous recevrez nos coordonnées bancaires par email après validation de la commande.
                          </p>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                              ⚠️ Délai de traitement : 2-3 jours ouvrés après réception du virement
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={acceptTerms}
                          onCheckedChange={setAcceptTerms}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                          J'accepte les{' '}
                          <Link href="/terms" className="text-teal-600 hover:underline">
                            conditions générales de vente
                          </Link>{' '}
                          et la{' '}
                          <Link href="/privacy" className="text-teal-600 hover:underline">
                            politique de confidentialité
                          </Link>
                          *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={newsletter}
                          onCheckedChange={setNewsletter}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Je souhaite recevoir les offres et actualités par email
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Étape précédente
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button onClick={nextStep}>
                    Étape suivante
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                ) : (
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessing || !acceptTerms}
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Payer {(total * 0.3).toFixed(2)}€ (30% d'acompte)
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.customization.eventType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Qté: {item.quantity}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-teal-600 mt-1">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Remise</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-teal-600">{total.toFixed(2)}€</span>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-3 mt-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Acompte à payer (30%)</span>
                      <span className="text-teal-600">{(total * 0.3).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Solde à la livraison (70%)</span>
                      <span>{(total * 0.7).toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Paiement sécurisé SSL</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Livraison 5-7 jours ouvrés</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span>Aperçu avant production</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}