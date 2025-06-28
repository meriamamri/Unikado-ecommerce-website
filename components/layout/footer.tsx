import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/f6c67671-5d64-464d-8baa-e3c253e46325.jpg"
              alt="Unikado"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Créez des cadeaux personnalisés uniques pour tous vos événements spéciaux.
              Des souvenirs qui marquent les moments précieux de la vie.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Nos produits</Link></li>
              <li><Link href="/custom" className="text-muted-foreground hover:text-primary">Personnalisation</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary">Mes commandes</Link></li>
              <li><Link href="/reviews" className="text-muted-foreground hover:text-primary">Avis clients</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">À propos</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Events */}
          <div className="space-y-4">
            <h3 className="font-semibold">Événements</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events/wedding" className="text-muted-foreground hover:text-primary">Mariage</Link></li>
              <li><Link href="/events/baby-shower" className="text-muted-foreground hover:text-primary">Baby Shower</Link></li>
              <li><Link href="/events/engagement" className="text-muted-foreground hover:text-primary">Fiançailles</Link></li>
              <li><Link href="/events/birthday" className="text-muted-foreground hover:text-primary">Anniversaire</Link></li>
              <li><Link href="/events/graduation" className="text-muted-foreground hover:text-primary">Remise de diplôme</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@unikado.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input placeholder="Votre email" className="flex-1" />
                <Button size="sm">S'abonner</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Unikado. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}