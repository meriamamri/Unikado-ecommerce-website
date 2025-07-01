export interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  event: string;
  badge: string | null;
  materials: string;
  dimensions: string;
  preparationTime: string;
  features: string[];
}
