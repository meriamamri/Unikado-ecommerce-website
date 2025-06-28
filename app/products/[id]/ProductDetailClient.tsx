"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Upload,
  Calendar,
  Users,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";

const eventTypes = [
  "Mariage",
  "Fiançailles",
  "Anniversaire de mariage",
  "Renouvellement de vœux",
];

const themes = [
  "Classique",
  "Moderne",
  "Vintage",
  "Bohème",
  "Minimaliste",
  "Floral",
];

const colors = [
  "Blanc cassé",
  "Ivoire",
  "Rose poudré",
  "Bleu pastel",
  "Lavande",
  "Doré",
  "Argenté",
  "Bordeaux",
  "Vert sauge",
  "Terracotta",
];

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    brideName: "",
    groomName: "",
    eventDate: "",
    theme: "",
    color: "",
    quantity: 50,
    specialInstructions: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    let price = product.basePrice;
    if (formData.quantity > 100) price *= 0.9;
    if (formData.quantity > 200) price *= 0.85;
    return (price * formData.quantity).toFixed(2);
  };

  const handleSubmitRequest = () => {
    if (
      !formData.eventType ||
      !formData.brideName ||
      !formData.groomName ||
      !formData.eventDate
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success(
      "Demande de personnalisation envoyée ! Nous vous contacterons sous 24h."
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-teal-600">
                {product.badge}
              </Badge>
            )}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="secondary" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-teal-600"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Customization */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>
            </div>

            <div className="text-2xl font-bold text-teal-600 mb-6">
              À partir de {product.basePrice}€
            </div>
          </div>

          <Tabs defaultValue="customize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customize">Personnaliser</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="customize" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Formulaire de personnalisation
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Type d&apos;événement *</Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) =>
                          handleInputChange("eventType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventDate">
                        Date de l&apos;événement *
                      </Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) =>
                          handleInputChange("eventDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brideName">Nom de la mariée *</Label>
                      <Input
                        id="brideName"
                        value={formData.brideName}
                        onChange={(e) =>
                          handleInputChange("brideName", e.target.value)
                        }
                        placeholder="Prénom et nom"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groomName">Nom du marié *</Label>
                      <Input
                        id="groomName"
                        value={formData.groomName}
                        onChange={(e) =>
                          handleInputChange("groomName", e.target.value)
                        }
                        placeholder="Prénom et nom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Thème</Label>
                      <Select
                        value={formData.theme}
                        onValueChange={(value) =>
                          handleInputChange("theme", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un thème" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme} value={theme}>
                              {theme}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color">Couleur préférée</Label>
                      <Select
                        value={formData.color}
                        onValueChange={(value) =>
                          handleInputChange("color", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une couleur" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">
                      Instructions spéciales
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) =>
                        handleInputChange("specialInstructions", e.target.value)
                      }
                      placeholder="Détails supplémentaires, demandes particulières..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Télécharger une image/logo (optionnel)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Glissez-déposez vos fichiers ici ou cliquez pour
                        parcourir
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choisir des fichiers
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Prix total estimé:</span>
                      <span className="text-teal-600">{calculatePrice()}€</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Prix final confirmé après validation de votre demande
                    </p>
                  </div>

                  <Button
                    onClick={handleSubmitRequest}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Envoyer la demande de personnalisation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Détails du produit
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Palette className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">Matériaux:</span>
                        <span className="text-gray-600">
                          {product.materials}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">Dimensions:</span>
                        <span className="text-gray-600">
                          {product.dimensions}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">Délai:</span>
                        <span className="text-gray-600">
                          {product.preparationTime}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Caractéristiques:</h4>
                      <ul className="space-y-1">
                        {product.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="text-teal-600 mr-2">•</span>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
