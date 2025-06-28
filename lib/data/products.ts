// Mock product data - in real app, this would come from API
export const products = [
  {
    id: 1,
    name: 'Carte de mariage élégante',
    description: 'Design sophistiqué avec dorure à chaud, papier premium 350g/m²',
    basePrice: 15,
    images: [
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 4.9,
    reviews: 127,
    category: 'Cartes',
    event: 'Mariage',
    badge: 'Bestseller',
    materials: 'Papier premium 350g/m², dorure à chaud',
    dimensions: '14 x 10 cm',
    preparationTime: '5-7 jours ouvrés',
    features: [
      'Personnalisation complète du texte',
      'Choix de 12 couleurs',
      'Dorure à chaud incluse',
      'Enveloppe assortie fournie',
      'Papier premium 350g/m²'
    ]
  },
  {
    id: 2,
    name: 'Dragées personnalisées',
    description: 'Boîtes élégantes avec vos noms gravés',
    basePrice: 8,
    images: [
      'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 4.8,
    reviews: 89,
    category: 'Dragées',
    event: 'Mariage',
    badge: 'Nouveau',
    materials: 'Carton premium, gravure laser',
    dimensions: '8 x 8 x 3 cm',
    preparationTime: '3-5 jours ouvrés',
    features: [
      'Gravure laser personnalisée',
      'Choix de 8 couleurs',
      'Dragées incluses',
      'Ruban assorti',
      'Carton premium'
    ]
  },
  {
    id: 3,
    name: 'Tableau personnalisé',
    description: 'Impression haute qualité sur toile',
    basePrice: 35,
    images: [
      'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 5.0,
    reviews: 203,
    category: 'Tableaux',
    event: 'Tous',
    badge: 'Premium',
    materials: 'Toile canvas, encres pigmentaires',
    dimensions: '30 x 40 cm',
    preparationTime: '7-10 jours ouvrés',
    features: [
      'Impression haute résolution',
      'Toile canvas premium',
      'Châssis bois inclus',
      'Encres résistantes UV',
      'Prêt à accrocher'
    ]
  },
  {
    id: 4,
    name: 'Faire-part baby shower',
    description: 'Designs adorables pour annoncer bébé',
    basePrice: 12,
    images: [
      'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 4.7,
    reviews: 156,
    category: 'Cartes',
    event: 'Baby Shower',
    badge: null,
    materials: 'Papier mat 300g/m²',
    dimensions: '12 x 17 cm',
    preparationTime: '4-6 jours ouvrés',
    features: [
      'Designs adorables',
      'Personnalisation complète',
      'Choix de couleurs',
      'Enveloppe incluse',
      'Papier de qualité'
    ]
  },
  {
    id: 5,
    name: 'Menu de mariage personnalisé',
    description: 'Élégant menu assorti à vos cartes',
    basePrice: 6,
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 4.6,
    reviews: 78,
    category: 'Cartes',
    event: 'Mariage',
    badge: null,
    materials: 'Papier premium 250g/m²',
    dimensions: '10 x 21 cm',
    preparationTime: '3-5 jours ouvrés',
    features: [
      'Design assorti aux cartes',
      'Texte personnalisable',
      'Finition mate ou brillante',
      'Plusieurs formats',
      'Papier premium'
    ]
  },
  {
    id: 6,
    name: 'Boîte à dragées vintage',
    description: 'Style rétro pour un mariage champêtre',
    basePrice: 10,
    images: [
      'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    rating: 4.5,
    reviews: 92,
    category: 'Dragées',
    event: 'Mariage',
    badge: null,
    materials: 'Carton kraft, ficelle naturelle',
    dimensions: '7 x 7 x 4 cm',
    preparationTime: '4-6 jours ouvrés',
    features: [
      'Style vintage authentique',
      'Matériaux naturels',
      'Personnalisation rustique',
      'Ficelle incluse',
      'Dragées comprises'
    ]
  }
];