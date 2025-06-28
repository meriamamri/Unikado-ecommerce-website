"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Conditions Générales de Vente
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
                <CardTitle>Conditions Générales de Vente - Unikado</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Objet</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Les présentes conditions générales de vente (CGV) régissent les relations contractuelles 
                    entre Unikado, société spécialisée dans la création de cadeaux personnalisés, et ses clients. 
                    Toute commande implique l'acceptation sans réserve des présentes CGV.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Produits et Services</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Unikado propose des services de personnalisation et de création de cadeaux pour tous types 
                    d'événements. Nos produits incluent notamment :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Cartes de mariage, faire-part et invitations personnalisées</li>
                    <li>Dragées et contenants personnalisés</li>
                    <li>Tableaux et impressions sur toile</li>
                    <li>Décorations d'événements sur mesure</li>
                    <li>Tout autre produit personnalisé selon demande</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Commandes</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Les commandes peuvent être passées :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>En ligne sur notre site web unikado.fr</li>
                    <li>Par téléphone au +33 1 23 45 67 89</li>
                    <li>Par email à contact@unikado.fr</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Toute commande est considérée comme ferme et définitive après validation du devis 
                    et réception de l'acompte de 30%.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Prix et Paiement</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Les prix sont indiqués en euros TTC. Le paiement s'effectue selon les modalités suivantes :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>30% d'acompte à la commande</li>
                    <li>70% du solde à la livraison</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Modes de paiement acceptés : carte bancaire, PayPal, virement bancaire.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Délais de Livraison</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Les délais de production et de livraison sont communiqués lors de la commande et 
                    varient selon la complexité du produit (généralement entre 5 et 15 jours ouvrés). 
                    Un aperçu est systématiquement envoyé pour validation avant production.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Droit de Rétractation</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Conformément à l'article L121-20-2 du Code de la consommation, le droit de rétractation 
                    ne peut être exercé pour les biens confectionnés selon les spécifications du consommateur 
                    ou nettement personnalisés. Nos produits étant entièrement personnalisés, 
                    aucun droit de rétractation ne peut être exercé.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Garanties</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Nous garantissons la conformité de nos produits aux spécifications validées par le client. 
                    En cas de défaut de fabrication, nous nous engageons à reprendre ou échanger le produit 
                    dans un délai de 48h après réception.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Propriété Intellectuelle</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Les créations réalisées par Unikado restent notre propriété intellectuelle. 
                    Le client dispose d'un droit d'usage personnel et non commercial des créations commandées.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Protection des Données</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Les données personnelles collectées sont utilisées uniquement dans le cadre de la 
                    relation commerciale et ne sont jamais transmises à des tiers. 
                    Consultez notre politique de confidentialité pour plus d'informations.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Litiges</h2>
                  <p className="text-gray-700 leading-relaxed">
                    En cas de litige, une solution amiable sera recherchée en priorité. 
                    À défaut, les tribunaux français seront seuls compétents.
                  </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Unikado</strong></p>
                    <p>123 Rue de la Créativité</p>
                    <p>75001 Paris, France</p>
                    <p>Téléphone : +33 1 23 45 67 89</p>
                    <p>Email : contact@unikado.fr</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}