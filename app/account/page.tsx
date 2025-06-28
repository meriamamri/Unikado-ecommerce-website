"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Mock user data
const userData = {
  firstName: 'Marie',
  lastName: 'Dubois',
  email: 'marie.dubois@email.com',
  phone: '+33 1 23 45 67 89',
  joinDate: '2023-06-15',
  totalOrders: 12,
  totalSpent: 1250.50
};

const recentOrders = [
  {
    id: 'UK123456',
    date: '2024-03-15',
    status: 'Livré',
    total: 125.50,
    items: 2,
    statusColor: 'bg-green-600'
  },
  {
    id: 'UK123455',
    date: '2024-03-10',
    status: 'En production',
    total: 89.90,
    items: 1,
    statusColor: 'bg-blue-600'
  },
  {
    id: 'UK123454',
    date: '2024-03-05',
    status: 'Expédié',
    total: 156.00,
    items: 3,
    statusColor: 'bg-purple-600'
  }
];

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // In real app, this would save to API
    setIsEditing(false);
    toast.success('Profil mis à jour avec succès !');
  };

  const handleLogout = () => {
    // In real app, this would clear authentication
    toast.success('Déconnexion réussie');
    window.location.href = '/';
  };

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
                Mon compte
              </h1>
              <p className="text-gray-600">
                Bienvenue, {userData.firstName} {userData.lastName}
              </p>
            </div>
            
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userData.totalOrders}</div>
                <div className="text-sm text-gray-600">Commandes passées</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userData.totalSpent.toFixed(2)}€</div>
                <div className="text-sm text-gray-600">Total dépensé</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto text-red-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Produits favoris</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="addresses">Adresses</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-teal-600" />
                        Informations personnelles
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? 'Annuler' : 'Modifier'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={handleSaveProfile}>
                          Sauvegarder
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                      </div>
                    )}

                    <Separator />

                    <div className="text-sm text-gray-600">
                      <p>Membre depuis le {new Date(userData.joinDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-teal-600" />
                      Mes commandes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-semibold">Commande #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('fr-FR')} • {order.items} article{order.items > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <Badge className={order.statusColor}>
                              {order.status}
                            </Badge>
                            <div className="text-right">
                              <p className="font-semibold">{order.total.toFixed(2)}€</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Voir
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-6">
                      <Button variant="outline" asChild>
                        <Link href="/orders">
                          Voir toutes mes commandes
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                      Mes adresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Adresse principale</h4>
                          <Badge>Par défaut</Badge>
                        </div>
                        <p className="text-gray-600">
                          123 Rue de la Paix<br />
                          75001 Paris<br />
                          France
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Modifier
                        </Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Ajouter une nouvelle adresse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-teal-600" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Emails promotionnels</p>
                          <p className="text-sm text-gray-600">Recevez nos offres et nouveautés</p>
                        </div>
                        <Button variant="outline" size="sm">Activé</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Suivi de commande</p>
                          <p className="text-sm text-gray-600">Notifications sur l'état de vos commandes</p>
                        </div>
                        <Button variant="outline" size="sm">Activé</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-teal-600" />
                        Sécurité
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Changer le mot de passe
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        Authentification à deux facteurs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/wishlist">
                    <Heart className="h-4 w-4 mr-2" />
                    Ma liste de souhaits
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/cart">
                    <Package className="h-4 w-4 mr-2" />
                    Mon panier
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/custom">
                    <Settings className="h-4 w-4 mr-2" />
                    Nouvelle personnalisation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-500 to-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Notre équipe est là pour vous accompagner
                </p>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/contact">
                    Contacter le support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}