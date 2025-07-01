"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
      <Image
        src="https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Cadeau personnalisé"
        className="w-full h-64 object-cover rounded-lg"
        width={100}
        height={100}
      />
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-gray-900">Carte de mariage personnalisée</h3>
        <p className="text-gray-600 text-sm">Élégante et unique pour votre jour J</p>
        <div className="flex items-center justify-between">
          <span className="text-teal-600 font-semibold">À partir de 15€</span>
          <Button size="sm" variant="outline">Personnaliser</Button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
