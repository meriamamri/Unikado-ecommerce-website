"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Filter } from 'lucide-react';
import { ReviewDisplay } from '@/components/reviews/review-display';
import { motion } from 'framer-motion';

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    customerName: 'Marie Dubois',
    customerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'Absolument parfait ! Les cartes de mariage étaient magnifiques, la qualité dépasse nos attentes. Le service client était exceptionnel et très réactif. Je recommande vivement Unikado pour tous vos événements spéciaux.',
    date: '2024-03-20T10:30:00Z',
    verified: true,
    productName: 'Carte de mariage élégante'
  },
  {
    id: '2',
    customerName: 'Thomas Martin',
    rating: 5,
    comment: 'Service impeccable ! Le tableau personnalisé pour l\'anniversaire de ma femme était une surprise parfaite. La qualité d\'impression est exceptionnelle et les délais ont été respectés.',
    date: '2024-03-18T14:15:00Z',
    verified: true,
    productName: 'Tableau personnalisé'
  },
  {
    id: '3',
    customerName: 'Sophie Leroy',
    customerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    comment: 'Très satisfaite des dragées personnalisées ! Le design était exactement ce que j\'avais imaginé. Seul petit bémol : la livraison a pris un jour de plus que prévu, mais le résultat en valait la peine.',
    date: '2024-03-15T09:45:00Z',
    verified: true,
    productName: 'Dragées personnalisées'
  },
  {
    id: '4',
    customerName: 'Pierre Leroy',
    rating: 5,
    comment: 'Excellent travail sur les invitations de baptême ! L\'équipe a su capturer parfaitement l\'esprit religieux que nous souhaitions. Nos invités ont été impressionnés par la qualité.',
    date: '2024-03-12T16:20:00Z',
    verified: true,
    productName: 'Invitations baptême'
  },
  {
    id: '5',
    customerName: 'Claire Moreau',
    rating: 5,
    comment: 'Les cartes de remerciement étaient sublimes ! Le thème romantique a été parfaitement respecté et la finition dorée apporte une touche d\'élégance incomparable. Merci pour ce travail exceptionnel.',
    date: '2024-03-10T11:30:00Z',
    verified: true,
    productName: 'Cartes de remerciement'
  },
  {
    id: '6',
    customerName: 'Jean Dupont',
    rating: 4,
    comment: 'Très content des invitations d\'anniversaire ! Le design moderne correspondait exactement à ce que je voulais. Livraison rapide et emballage soigné. Je recommande !',
    date: '2024-03-08T13:10:00Z',
    verified: true,
    productName: 'Invitations anniversaire'
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === 'all' || review.rating.toString() === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Avis clients
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez ce que nos clients pensent de nos créations personnalisées
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Note moyenne</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Basé sur {reviews.length} avis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trier par</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récents</SelectItem>
                      <SelectItem value="oldest">Plus anciens</SelectItem>
                      <SelectItem value="highest">Note la plus élevée</SelectItem>
                      <SelectItem value="lowest">Note la plus basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtrer par note</label>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les notes</SelectItem>
                      <SelectItem value="5">5 étoiles</SelectItem>
                      <SelectItem value="4">4 étoiles</SelectItem>
                      <SelectItem value="3">3 étoiles</SelectItem>
                      <SelectItem value="2">2 étoiles</SelectItem>
                      <SelectItem value="1">1 étoile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  Avis clients ({filteredReviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewDisplay reviews={filteredReviews} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}