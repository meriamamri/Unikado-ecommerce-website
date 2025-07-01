"use client";

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { StepIcon } from './StepIcon.server';

interface ProcessStepCardProps {
  step: {
    icon: string;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  totalSteps: number;
}

export function ProcessStepCard({ step, index, totalSteps }: ProcessStepCardProps) {
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 space-y-4">
          <StepIcon color={step.color} iconName={step.icon} stepNumber={index+1} />
          
          <h3 className="text-xl font-semibold text-gray-900">
            {step.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </CardContent>
      </Card>

      {/* Connector line */}
      {index < totalSteps - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-10"></div>
      )}
    </motion.div>
  );
}
