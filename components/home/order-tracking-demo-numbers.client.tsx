"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface OrderTrackingDemoNumbersProps {
  setOrderNumber: (orderNumber: string) => void;
}

export function OrderTrackingDemoNumbers({ setOrderNumber }: OrderTrackingDemoNumbersProps) {
  const demoOrderNumbers = ['UK496266', 'UK123455', 'UK867012', 'UK138421'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-12 text-center"
    >
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Démonstration</h4>
        <p className="text-sm text-gray-600 mb-4">
          Essayez avec ces numéros de commande de démonstration :
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {demoOrderNumbers.map((orderNum) => (
            <Button
              key={orderNum}
              variant="outline"
              size="sm"
              onClick={() => setOrderNumber(orderNum)}
              className="font-mono"
            >
              {orderNum}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
