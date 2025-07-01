"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
    event: string;
  };
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <Quote className="h-6 w-6 text-teal-600 opacity-50" />
          </div>

          <p className="text-gray-700 leading-relaxed italic">
            {"\"" + testimonial.content + "\""}
          </p>

          <div className="flex items-center space-x-3 pt-4 border-t">
            <Avatar>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role} • {testimonial.event}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
