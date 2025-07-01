import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function OrderTrackingContactCard() {
  return (
    <Card className="bg-gradient-to-br from-teal-500 to-purple-600 text-white border-0">
      <CardContent className="p-6 text-center">
        <h4 className="font-semibold mb-2">Besoin d&#39;aide ?</h4>
        <p className="text-sm opacity-90 mb-4">
          Notre équipe est disponible pour répondre à vos questions
        </p>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/contact">
            Nous contacter
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
