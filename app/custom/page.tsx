"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const eventTypes = [
  'Mariage',
  'Baby Shower',
  'Fiançailles',
  'Anniversaire',
  'Remise de diplôme',
  'Autre'
];

const budgetRanges = [
  'Moins de 50€',
  '50€ - 100€',
  '100€ - 200€',
  '200€ - 500€',
  'Plus de 500€'
];

export default function CustomPage() {
  const [formData, setFormData] = useState({
    eventType: '',
    description: '',
    budget: '',
    quantity: '',
    dateNeeded: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.eventType || !formData.description || !formData.contactName || !formData.contactEmail) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success('Votre demande personnalisée a été envoyée ! Nous vous contacterons sous 24h.');
    
    // Reset form
    setFormData({
      eventType: '',
      description: '',
      budget: '',
      quantity: '',
      dateNeeded: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-teal-600 border border-teal-200 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Création sur mesure</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Créez votre cadeau
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">
              {" "}unique
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vous avez une idée spéciale en tête ? Décrivez-nous votre projet et nous créerons 
            le cadeau personnalisé parfait pour votre événement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Process Steps */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Comment ça marche ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Décrivez votre idée</h4>
                      <p className="text-sm text-gray-600">Partagez votre vision et vos besoins</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Recevez un devis</h4>
                      <p className="text-sm text-gray-600">Nous étudions votre projet sous 24h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Validation et création</h4>
                      <p className="text-sm text-gray-600">Nous créons votre cadeau unique</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-green-600 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Garanties</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Devis gratuit et sans engagement</li>
                    <li>• Aperçu avant production</li>
                    <li>• Qualité premium garantie</li>
                    <li>• Livraison dans les délais</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Custom Request Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Formulaire de demande personnalisée</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Type d'événement *</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre événement" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantité estimée</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', e.target.value)}
                          placeholder="Ex: 50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description de votre projet *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Décrivez en détail votre idée : type de produit souhaité, style, couleurs, textes à inclure, matériaux préférés, etc."
                        rows={5}
                        className="resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget approximatif</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map(range => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateNeeded">Date souhaitée</Label>
                        <Input
                          id="dateNeeded"
                          type="date"
                          value={formData.dateNeeded}
                          onChange={(e) => handleInputChange('dateNeeded', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Images d'inspiration (optionnel)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Ajoutez des images pour nous aider à comprendre votre vision
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          Choisir des fichiers
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Vos coordonnées</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Nom complet *</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => handleInputChange('contactName', e.target.value)}
                            placeholder="Votre nom et prénom"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Téléphone</Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                            placeholder="Votre numéro de téléphone"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="contactEmail">Email *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Envoyer ma demande personnalisée
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      En envoyant cette demande, vous acceptez d'être contacté par notre équipe 
                      pour discuter de votre projet.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}