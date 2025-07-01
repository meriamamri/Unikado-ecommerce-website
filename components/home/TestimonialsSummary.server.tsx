import { Star } from 'lucide-react';

export function TestimonialsSummary() {
  return (
    <div className="text-center mt-8">
      <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border">
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="font-semibold text-gray-900">4.9/5</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <span className="text-gray-600">Plus de 2000 avis clients</span>
      </div>
    </div>
  );
}
