'use client';

import { Heart, Baby, Sparkles, Cake, GraduationCap, Gift, LucideIcon } from 'lucide-react';
import { EventCategoryCard } from './EventCategoryCard';
import { eventCategories } from '@/lib/constants/event-categories';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Sparkles,
  Cake,
  GraduationCap,
  Gift,
};

export function EventCategoriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventCategories.map((category, index) => {
        const IconComponent = iconMap[category.icon]; 
        return (
          <EventCategoryCard
            key={category.title}
            index={index}
            icon={IconComponent}
            title={category.title}
            description={category.description}
            color={category.color}
            eventFilter={category.eventFilter}
          />
        );
      })}
    </div>
  );
}
