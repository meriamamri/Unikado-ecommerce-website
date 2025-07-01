"use client";

import { useState } from 'react';
import { OrderTrackingHeader } from './order-tracking-header.server';
import { OrderTrackingForm } from './order-tracking-form.client';
import { OrderTrackingSteps } from './order-tracking-steps.server';
import { OrderTrackingContactCard } from './order-tracking-contact-card.server';
import { OrderTrackingDemoNumbers } from './order-tracking-demo-numbers.client';

export function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <OrderTrackingHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <OrderTrackingForm initialOrderNumber={orderNumber} setOrderNumber={setOrderNumber} />
            <div className="space-y-6">
              <OrderTrackingSteps />
              <OrderTrackingContactCard />
            </div>
          </div>

          <OrderTrackingDemoNumbers setOrderNumber={setOrderNumber} />
        </div>
      </div>
    </section>
  );
}
