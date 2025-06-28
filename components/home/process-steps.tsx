"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Search, Palette, CreditCard, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: 'Choisissez votre produit',
    description: 'Parcourez notre catalogue et sélectionnez le produit parfait pour votre événement',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'Personnalisez',
    description: 'Ajoutez vos textes, couleurs, images et tous les détails qui rendront votre cadeau unique',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: CreditCard,
    title: 'Validez et payez',
    description: 'Confirmez votre commande avec un acompte de 30% et recevez un aperçu de votre création',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Package,
    title: 'Recevez votre commande',
    description: 'Nous produisons votre cadeau avec soin et vous le livrons dans les délais convenus',
    color: 'from-orange-500 to-red-500'
  }
];

export function ProcessSteps() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent pour créer vos cadeaux personnalisés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-10"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}