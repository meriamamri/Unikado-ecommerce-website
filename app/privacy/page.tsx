"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Politique de Confidentialité
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <Calendar className="h-4 w-4" />
                <span>Dernière mise à jour : 15 mars 2024</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Politique de Confidentialité - Unikado</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Unikado s'engage à protéger la confidentialité et la sécurité des données personnelles 
                    de ses clients. Cette politique de confidentialité explique comment nous collectons, 
                    utilisons, stockons et protégeons vos informations personnelles conformément au 
                    Règlement Général sur la Protection des Données (RGPD).
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Responsable du Traitement</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Unikado</strong></p>
                    <p className="text-gray-700">123 Rue de la Créativité</p>
                    <p className="text-gray-700">75001 Paris, France</p>
                    <p className="text-gray-700">Email : contact@unikado.fr</p>
                    <p className="text-gray-700">Téléphone : +33 1 23 45 67 89</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Données Collectées</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Nous collectons les données personnelles suivantes :
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Données d'identification :</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Nom et prénom</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone</li>
                        <li>Adresse postale</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Données de commande :</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Détails des produits commandés</li>
                        <li>Préférences de personnalisation</li>
                        <li>Historique des commandes</li>
                        <li>Données de paiement (traitées par nos partenaires sécurisés)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Données techniques :</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Adresse IP</li>
                        <li>Données de navigation (cookies)</li>
                        <li>Type de navigateur et appareil utilisé</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Finalités du Traitement</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Vos données personnelles sont utilisées pour :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Traiter et livrer vos commandes</li>
                    <li>Communiquer avec vous concernant vos commandes</li>
                    <li>Améliorer nos produits et services</li>
                    <li>Vous envoyer des informations marketing (avec votre consentement)</li>
                    <li>Respecter nos obligations légales</li>
                    <li>Prévenir la fraude et assurer la sécurité</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Base Légale</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Le traitement de vos données personnelles repose sur :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Exécution du contrat :</strong> pour traiter vos commandes</li>
                    <li><strong>Intérêt légitime :</strong> pour améliorer nos services</li>
                    <li><strong>Consentement :</strong> pour les communications marketing</li>
                    <li><strong>Obligation légale :</strong> pour la comptabilité et les obligations fiscales</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Partage des Données</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Nos prestataires de services (livraison, paiement, hébergement)</li>
                    <li>Les autorités compétentes si requis par la loi</li>
                    <li>Nos partenaires avec votre consentement explicite</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Durée de Conservation</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Nous conservons vos données personnelles :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Données de commande : 10 ans (obligations comptables)</li>
                    <li>Données marketing : jusqu'à votre désinscription</li>
                    <li>Données techniques : 13 mois maximum</li>
                    <li>Données de compte : jusqu'à suppression de votre compte</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Vos Droits</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                    <li><strong>Droit à la limitation :</strong> limiter le traitement</li>
                    <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                    <li><strong>Droit de retrait du consentement :</strong> à tout moment</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Pour exercer ces droits, contactez-nous à : contact@unikado.fr
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Sécurité des Données</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Nous mettons en place des mesures techniques et organisationnelles appropriées 
                    pour protéger vos données contre la perte, l'utilisation abusive, l'accès non autorisé, 
                    la divulgation, l'altération ou la destruction. Nos serveurs sont sécurisés et 
                    les données sensibles sont chiffrées.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Cookies</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Notre site utilise des cookies pour :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Assurer le bon fonctionnement du site</li>
                    <li>Mémoriser vos préférences</li>
                    <li>Analyser l'utilisation du site</li>
                    <li>Personnaliser votre expérience</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Transferts Internationaux</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Vos données personnelles sont principalement traitées au sein de l'Union Européenne. 
                    En cas de transfert vers des pays tiers, nous nous assurons que des garanties 
                    appropriées sont en place conformément au RGPD.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Modifications</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Cette politique de confidentialité peut être mise à jour. Nous vous informerons 
                    de tout changement significatif par email ou via notre site web.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact et Réclamations</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Pour toute question concernant cette politique ou pour exercer vos droits :
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Email :</strong> contact@unikado.fr</p>
                    <p className="text-gray-700"><strong>Courrier :</strong> Unikado - 123 Rue de la Créativité, 75001 Paris</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Vous avez également le droit de déposer une réclamation auprès de la CNIL 
                    (Commission Nationale de l'Informatique et des Libertés) si vous estimez 
                    que vos droits ne sont pas respectés.
                  </p>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}