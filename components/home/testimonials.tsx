"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Mariée',
    content: 'Les cartes de mariage étaient absolument magnifiques ! Le service client était exceptionnel et la qualité dépasse nos attentes. Nos invités ont adoré.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    event: 'Mariage'
  },
  {
    name: 'Sophie Martin',
    role: 'Future maman',
    content: 'J\'ai commandé des faire-part pour mon baby shower et le résultat était parfait ! L\'équipe a su capturer exactement ce que je voulais.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    event: 'Baby Shower'
  },
  {
    name: 'Thomas Leroy',
    role: 'Client',
    content: 'Service rapide et professionnel. Le tableau personnalisé pour l\'anniversaire de ma femme était une surprise parfaite. Je recommande vivement !',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    event: 'Anniversaire'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des milliers de clients satisfaits nous font confiance pour leurs moments précieux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
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
                    "{testimonial.content}"
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
          ))}
        </div>

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
      </div>
    </section>
  );
}