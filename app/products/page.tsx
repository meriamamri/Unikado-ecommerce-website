"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Heart, Search, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/contexts/wishlist-context';

const products = [
  {
    id: 1,
    name: 'Carte de mariage élégante',
    description: 'Design sophistiqué avec dorure à chaud',
    price: 15,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 127,
    category: 'Cartes',
    event: 'Mariage',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Dragées personnalisées',
    description: 'Boîtes élégantes avec vos noms gravés',
    price: 8,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 89,
    category: 'Dragées',
    event: 'Mariage',
    badge: 'Nouveau'
  },
  {
    id: 3,
    name: 'Tableau personnalisé',
    description: 'Impression haute qualité sur toile',
    price: 35,
    image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5.0,
    reviews: 203,
    category: 'Tableaux',
    event: 'Tous',
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'Faire-part baby shower',
    description: 'Designs adorables pour annoncer bébé',
    price: 12,
    image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 156,
    category: 'Cartes',
    event: 'Baby Shower',
    badge: null
  },
  {
    id: 5,
    name: 'Menu de mariage personnalisé',
    description: 'Élégant menu assorti à vos cartes',
    price: 6,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 78,
    category: 'Cartes',
    event: 'Mariage',
    badge: null
  },
  {
    id: 6,
    name: 'Boîte à dragées vintage',
    description: 'Style rétro pour un mariage champêtre',
    price: 10,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 92,
    category: 'Dragées',
    event: 'Mariage',
    badge: null
  }
];

const categories = ['Tous', 'Cartes', 'Dragées', 'Tableaux', 'Décorations'];
const events = ['Tous', 'Mariage', 'Baby Shower', 'Fiançailles', 'Anniversaire', 'Remise de diplôme'];
const priceRanges = [
  { label: 'Moins de 10€', min: 0, max: 10 },
  { label: '10€ - 20€', min: 10, max: 20 },
  { label: '20€ - 50€', min: 20, max: 50 },
  { label: 'Plus de 50€', min: 50, max: 1000 }
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedEvent, setSelectedEvent] = useState('Tous');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Handle URL parameters on component mount
  useEffect(() => {
    const eventParam = searchParams.get('event');
    const searchParam = searchParams.get('search');
    
    if (eventParam && events.includes(eventParam)) {
      setSelectedEvent(eventParam);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesEvent = selectedEvent === 'Tous' || product.event === selectedEvent || product.event === 'Tous';
    
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      const priceRange = priceRanges.find(pr => pr.label === range);
      return priceRange && product.price >= priceRange.min && product.price <= priceRange.max;
    });

    return matchesSearch && matchesCategory && matchesEvent && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.reviews - a.reviews; // popular
    }
  });

  const getPageTitle = () => {
    if (selectedEvent !== 'Tous') {
      return `Produits pour ${selectedEvent}`;
    }
    return 'Nos produits personnalisables';
  };

  const getPageDescription = () => {
    if (selectedEvent !== 'Tous') {
      return `Découvrez notre collection de cadeaux personnalisés pour ${selectedEvent.toLowerCase()}`;
    }
    return 'Découvrez notre collection complète de cadeaux personnalisés';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {getPageTitle()}
        </h1>
        <p className="text-xl text-gray-600">
          {getPageDescription()}
        </p>
        {selectedEvent !== 'Tous' && (
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              Filtré par : {selectedEvent}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </h3>

            {/* Search */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nom du produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Event Filter */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Événement</label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Prix</label>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={range.label}
                      checked={selectedPriceRanges.includes(range.label)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPriceRanges([...selectedPriceRanges, range.label]);
                        } else {
                          setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range.label));
                        }
                      }}
                    />
                    <label htmlFor={range.label} className="text-sm">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedEvent !== 'Tous' || selectedCategory !== 'Tous' || selectedPriceRanges.length > 0 || searchTerm) && (
              <div className="pt-4 border-t mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Tous');
                    setSelectedEvent('Tous');
                    setSelectedPriceRanges([]);
                    // Update URL to remove parameters
                    window.history.pushState({}, '', '/products');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
                {selectedEvent !== 'Tous' && ` pour ${selectedEvent}`}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="block">
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'grid' ? 'h-48' : 'h-32'
                      }`}
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-teal-600">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors ${
                        isInWishlist(product.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-600 hover:text-red-500'
                      }`}
                      onClick={(e) => handleWishlistToggle(product, e)}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <CardContent className={`p-4 space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-teal-600">
                        À partir de {product.price}€
                      </span>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/products/${product.id}`;
                        }}
                      >
                        Personnaliser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun produit ne correspond à vos critères
                {selectedEvent !== 'Tous' && ` pour ${selectedEvent}`}.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tous');
                  setSelectedEvent('Tous');
                  setSelectedPriceRanges([]);
                  window.history.pushState({}, '', '/products');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}