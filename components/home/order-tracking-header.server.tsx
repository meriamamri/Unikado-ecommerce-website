import { motion } from 'framer-motion';

export function OrderTrackingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Suivez votre commande
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Entrez votre numéro de commande pour suivre l&#39;avancement de votre création personnalisée
      </p>
    </motion.div>
  );
}
