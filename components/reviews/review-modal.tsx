"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  productName: string;
}

export function ReviewModal({ isOpen, onClose, orderNumber, productName }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Veuillez sélectionner une note');
      return;
    }

    if (!comment.trim()) {
      toast.error('Veuillez ajouter un commentaire');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Merci pour votre avis ! Il sera publié après modération.');
      
      // Reset form
      setRating(0);
      setComment('');
      onClose();
      
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de votre avis. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Laisser un avis</DialogTitle>
          <DialogDescription>
            Partagez votre expérience avec "{productName}" (Commande #{orderNumber})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label>Note *</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= displayRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && (
                  <>
                    {rating}/5 - {
                      rating === 1 ? 'Très décevant' :
                      rating === 2 ? 'Décevant' :
                      rating === 3 ? 'Correct' :
                      rating === 4 ? 'Bien' :
                      'Excellent'
                    }
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Votre commentaire *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience avec ce produit : qualité, design, service client..."
              rows={4}
              className="resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500">
              Minimum 10 caractères ({comment.length}/10)
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || comment.length < 10}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Envoi...
                </>
              ) : (
                'Publier l\'avis'
              )}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center">
          Votre avis sera vérifié avant publication et pourra être utilisé sur notre site web.
        </div>
      </DialogContent>
    </Dialog>
  );
}