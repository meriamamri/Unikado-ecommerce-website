"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productName: string;
}

interface ReviewDisplayProps {
  reviews: Review[];
}

export function ReviewDisplay({ reviews }: ReviewDisplayProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucun avis pour le moment.</p>
        <p className="text-sm">Soyez le premier à laisser un avis !</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                <AvatarFallback>{getInitials(review.customerName)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Achat vérifié
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.date)}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
                
                <p className="text-sm text-gray-500">
                  Produit : {review.productName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}