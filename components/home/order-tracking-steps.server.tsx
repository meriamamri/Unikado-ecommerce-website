import { motion } from 'framer-motion';

export function OrderTrackingSteps() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Étapes de votre commande
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Commande confirmée</h4>
              <p className="text-sm text-gray-600">Votre commande est reçue et validée</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Création du design</h4>
              <p className="text-sm text-gray-600">Notre équipe travaille sur votre design</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Aperçu envoyé</h4>
              <p className="text-sm text-gray-600">Validation de votre design par email</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Production & Livraison</h4>
              <p className="text-sm text-gray-600">Fabrication puis expédition de votre commande</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
