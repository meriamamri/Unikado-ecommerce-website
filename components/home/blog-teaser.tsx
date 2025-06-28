"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const articles = [
  {
    title: 'Tendances mariage 2024 : Les couleurs à adopter',
    excerpt: 'Découvrez les palettes de couleurs qui feront sensation pour votre mariage cette année.',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Mariage',
    date: '15 Mars 2024',
    readTime: '5 min'
  },
  {
    title: 'DIY : Personnaliser ses dragées de mariage',
    excerpt: 'Tutoriel complet pour créer des dragées uniques qui marqueront vos invités.',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'DIY',
    date: '12 Mars 2024',
    readTime: '8 min'
  },
  {
    title: 'Baby shower : 10 idées de thèmes originaux',
    excerpt: 'Inspirez-vous de ces thèmes créatifs pour organiser un baby shower mémorable.',
    image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Baby Shower',
    date: '10 Mars 2024',
    readTime: '6 min'
  }
];

export function BlogTeaser() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Inspiration & Conseils
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos derniers articles pour vous inspirer et réussir vos événements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {article.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>•</span>
                    <span>{article.readTime} de lecture</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Button variant="ghost" className="p-0 h-auto font-semibold text-teal-600 hover:text-teal-700">
                    Lire la suite
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              Voir tous les articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}