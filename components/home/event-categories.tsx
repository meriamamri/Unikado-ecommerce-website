"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Baby, Sparkles, Cake, GraduationCap, Gift } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    icon: Heart,
    title: 'Mariage',
    description: 'Cartes, dragées, décorations pour votre jour J',
    color: 'from-pink-500 to-rose-500',
    eventFilter: 'Mariage'
  },
  {
    icon: Baby,
    title: 'Baby Shower',
    description: 'Célébrez l\'arrivée de bébé avec style',
    color: 'from-blue-500 to-cyan-500',
    eventFilter: 'Baby Shower'
  },
  {
    icon: Sparkles,
    title: 'Fiançailles',
    description: 'Annoncez votre engagement avec élégance',
    color: 'from-purple-500 to-pink-500',
    eventFilter: 'Fiançailles'
  },
  {
    icon: Cake,
    title: 'Anniversaire',
    description: 'Des cadeaux uniques pour chaque âge',
    color: 'from-orange-500 to-red-500',
    eventFilter: 'Anniversaire'
  },
  {
    icon: GraduationCap,
    title: 'Remise de diplôme',
    description: 'Célébrez les réussites académiques',
    color: 'from-green-500 to-teal-500',
    eventFilter: 'Remise de diplôme'
  },
  {
    icon: Gift,
    title: 'Autres événements',
    description: 'Toutes vos occasions spéciales',
    color: 'from-indigo-500 to-purple-500',
    eventFilter: 'Tous'
  }
];

export function EventCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pour tous vos événements
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos collections spécialement conçues pour chaque moment important de votre vie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-gray-600">
                          {category.description}
                        </p>
                      </div>

                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link href={`/products?event=${encodeURIComponent(category.eventFilter)}`}>
                          Explorer
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}