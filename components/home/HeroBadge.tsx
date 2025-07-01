"use client";

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-teal-600 border border-teal-200"
    >
      <Sparkles className="h-4 w-4" />
      <span>Des cadeaux personnalisés</span>
    </motion.div>
  );
}
