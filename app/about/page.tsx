"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Clock, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'Nous mettons tout notre cœur dans chaque création pour rendre vos moments uniques.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Users,
    title: 'Proximité',
    description: 'Une relation de confiance avec nos clients, basée sur l\'écoute et la personnalisation.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Des matériaux premium et un savoir-faire artisanal pour une qualité irréprochable.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    title: 'Réactivité',
    description: 'Respect des délais et communication transparente tout au long du processus.',
    color: 'from-green-500 to-teal-500'
  }
];

const team = [
  {
    name: 'Marie Dubois',
    role: 'Fondatrice & Directrice Créative',
    description: 'Passionnée par les arts graphiques depuis plus de 10 ans, Marie a créé Unikado pour donner vie aux rêves de ses clients.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Thomas Martin',
    role: 'Responsable Production',
    description: 'Expert en impression et finition, Thomas veille à ce que chaque produit respecte nos standards de qualité.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Sophie Leroy',
    role: 'Conseillère Clientèle',
    description: 'Sophie accompagne nos clients dans leurs projets avec bienveillance et expertise pour concrétiser leurs idées.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const stats = [
  { number: '2000+', label: 'Clients satisfaits' },
  { number: '5000+', label: 'Créations réalisées' },
  { number: '4.9/5', label: 'Note moyenne' },
  { number: '5 ans', label: 'D\'expérience' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-teal-600 border border-teal-200 mb-4">
              <Heart className="h-4 w-4" />
              <span>Notre histoire</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              À propos de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">
                {" "}Unikado
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Depuis 2019, nous créons des cadeaux personnalisés qui transforment vos moments précieux 
              en souvenirs inoubliables. Chaque création raconte une histoire unique.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-2xl lg:text-3xl font-bold text-teal-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Tout a commencé en 2019 avec une simple idée : permettre à chacun de créer 
                  des cadeaux vraiment personnalisés pour célébrer les moments qui comptent. 
                  Marie, notre fondatrice, frustrée par le manque d'options de personnalisation 
                  sur le marché, a décidé de créer Unikado.
                </p>
                <p>
                  Depuis nos débuts, nous avons accompagné plus de 2000 clients dans la création 
                  de leurs cadeaux uniques. Que ce soit pour un mariage, une naissance, un anniversaire 
                  ou toute autre occasion spéciale, nous mettons notre expertise au service de vos émotions.
                </p>
                <p>
                  Aujourd'hui, Unikado c'est une équipe passionnée, des partenaires de confiance 
                  et surtout, l'engagement de faire de chaque commande une expérience exceptionnelle.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Notre atelier"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-teal-600">2019</div>
                <div className="text-sm text-gray-600">Année de création</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900">
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les personnes passionnées qui donnent vie à vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 mx-auto rounded-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {member.role}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Prêt à créer quelque chose d'unique ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet ou commencez dès maintenant 
              la personnalisation de votre cadeau.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="/custom">
                  Commencer un projet
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@unikado.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}