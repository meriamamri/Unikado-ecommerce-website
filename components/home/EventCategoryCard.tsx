"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EventCategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  eventFilter: string;
  index: number;
}

export function EventCategoryCard({
  icon: Icon,
  title,
  description,
  color,
  eventFilter,
  index
}: EventCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-gray-600">
                {description}
              </p>
            </div>

            <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Link href={`/products?event=${encodeURIComponent(eventFilter)}`}>
                Explorer
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
