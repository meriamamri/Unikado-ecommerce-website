"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/wishlist-context';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Heart,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Produits', href: '/products' },
  { name: 'Événements', href: '/events' },
  { name: 'Personnalisation', href: '/custom' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistCount } = useWishlist();
  
  // Mock data - in real app, these would come from state management
  const cartItemsCount = 2;
  const isLoggedIn = false; // Change to true to test logged in state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In real app, this would navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/f6c67671-5d64-464d-8baa-e3c253e46325.jpg"
              alt="Unikado"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 h-9"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex h-9 w-9"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Wishlist/Heart */}
            <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-teal-600 hover:bg-teal-600">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Account */}
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9" asChild>
                <Link href="/account">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link href="/login">
                  Connexion
                </Link>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <form onSubmit={handleSearch} className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4 mb-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="space-y-4 mt-auto">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                        <Heart className="h-4 w-4 mr-2" />
                        Ma liste de souhaits
                        {wishlistCount > 0 && (
                          <Badge className="ml-auto bg-red-500">
                            {wishlistCount}
                          </Badge>
                        )}
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/cart" onClick={() => setIsOpen(false)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Mon panier
                        {cartItemsCount > 0 && (
                          <Badge className="ml-auto bg-teal-600">
                            {cartItemsCount}
                          </Badge>
                        )}
                      </Link>
                    </Button>

                    {isLoggedIn ? (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/account" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Mon compte
                        </Link>
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button className="w-full" asChild>
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            Connexion
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            Créer un compte
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}