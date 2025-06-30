"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Eye, 
  Edit, 
  DollarSign, 
  Send, 
  Image as ImageIcon,
  Calendar,
  User,
  Package,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for custom requests
const mockCustomRequests = [
  {
    id: 'CR001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    eventType: 'Mariage',
    description: 'Cartes de mariage élégantes avec dorure à chaud, thème vintage, couleurs rose poudré et doré. Besoin de 150 exemplaires.',
    quantity: 150,
    budget: '200€ - 500€',
    dateNeeded: '2024-06-15',
    status: 'pending',
    createdAt: '2024-03-20T10:30:00Z',
    price: null,
    adminMessage: null,
    mockupUrl: null
  },
  {
    id: 'CR002',
    customerName: 'Thomas Martin',
    customerEmail: 'thomas.martin@email.com',
    eventType: 'Baby Shower',
    description: 'Faire-part baby shower avec thème jungle, couleurs vertes et jaunes, 80 exemplaires.',
    quantity: 80,
    budget: '100€ - 200€',
    dateNeeded: '2024-04-10',
    status: 'quoted',
    createdAt: '2024-03-18T14:20:00Z',
    price: 180,
    adminMessage: 'Voici notre proposition pour vos faire-part baby shower. Le design inclut des éléments jungle avec finition premium.',
    mockupUrl: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'CR003',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@email.com',
    eventType: 'Anniversaire',
    description: 'Invitations anniversaire 30 ans, style moderne et épuré, couleurs noir et or.',
    quantity: 50,
    budget: '50€ - 100€',
    dateNeeded: '2024-05-20',
    status: 'in-production',
    createdAt: '2024-03-15T09:15:00Z',
    price: 85,
    adminMessage: 'Design validé, commande en production. Livraison prévue dans 5 jours.',
    mockupUrl: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-600' },
  quoted: { label: 'Devis envoyé', color: 'bg-blue-600' },
  'in-production': { label: 'En production', color: 'bg-purple-600' },
  completed: { label: 'Terminé', color: 'bg-green-600' },
  cancelled: { label: 'Annulé', color: 'bg-red-600' }
};

interface CustomRequestsTableProps {
  searchTerm: string;
  statusFilter: string;
}

export function CustomRequestsTable({ searchTerm, statusFilter }: CustomRequestsTableProps) {
  const [requests, setRequests] = useState(mockCustomRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    price: '',
    message: '',
    mockupUrl: ''
  });

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
  };

  const handleSendQuote = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setQuoteForm({
        price: request.price?.toString() || '',
        message: request.adminMessage || '',
        mockupUrl: request.mockupUrl || ''
      });
      setIsQuoteModalOpen(true);
    }
  };

  const handleSubmitQuote = () => {
    if (!selectedRequest || !quoteForm.price) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setRequests(prev => prev.map(request => 
      request.id === selectedRequest.id 
        ? {
            ...request,
            price: parseFloat(quoteForm.price),
            adminMessage: quoteForm.message,
            mockupUrl: quoteForm.mockupUrl,
            status: 'quoted'
          }
        : request
    ));

    toast.success('Devis envoyé au client avec succès !');
    setIsQuoteModalOpen(false);
    setQuoteForm({ price: '', message: '', mockupUrl: '' });
  };

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    toast.success('Statut mis à jour avec succès !');
  };

  const handleSendPaymentLink = (requestId: string) => {
    // In real app, this would generate and send a payment link
    toast.success('Lien de paiement (30% d\'acompte) envoyé au client !');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demandes de personnalisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Événement</th>
                  <th className="text-left p-4 font-medium">Quantité</th>
                  <th className="text-left p-4 font-medium">Budget</th>
                  <th className="text-left p-4 font-medium">Date souhaitée</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{request.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{request.customerName}</div>
                        <div className="text-sm text-gray-600">{request.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">{request.eventType}</td>
                    <td className="p-4">{request.quantity}</td>
                    <td className="p-4">{request.budget}</td>
                    <td className="p-4">{formatDate(request.dateNeeded)}</td>
                    <td className="p-4">
                      <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                        {statusConfig[request.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendQuote(request.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {request.status === 'quoted' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendPaymentLink(request.id)}
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Request Details Modal */}
      {selectedRequest && !isQuoteModalOpen && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la demande {selectedRequest.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Client</Label>
                  <p>{selectedRequest.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.customerEmail}</p>
                </div>
                <div>
                  <Label className="font-medium">Événement</Label>
                  <p>{selectedRequest.eventType}</p>
                </div>
              </div>
              
              <div>
                <Label className="font-medium">Description</Label>
                <p className="mt-1 text-gray-700">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-medium">Quantité</Label>
                  <p>{selectedRequest.quantity}</p>
                </div>
                <div>
                  <Label className="font-medium">Budget</Label>
                  <p>{selectedRequest.budget}</p>
                </div>
                <div>
                  <Label className="font-medium">Date souhaitée</Label>
                  <p>{formatDate(selectedRequest.dateNeeded)}</p>
                </div>
              </div>

              {selectedRequest.mockupUrl && (
                <div>
                  <Label className="font-medium">Aperçu/Mockup</Label>
                  <img 
                    src={selectedRequest.mockupUrl} 
                    alt="Mockup" 
                    className="mt-2 w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {selectedRequest.price && (
                <div>
                  <Label className="font-medium">Prix proposé</Label>
                  <p className="text-lg font-semibold text-green-600">{selectedRequest.price}€</p>
                </div>
              )}

              {selectedRequest.adminMessage && (
                <div>
                  <Label className="font-medium">Message admin</Label>
                  <p className="mt-1 text-gray-700">{selectedRequest.adminMessage}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Select 
                  value={selectedRequest.status} 
                  onValueChange={(value) => handleStatusChange(selectedRequest.id, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="quoted">Devis envoyé</SelectItem>
                    <SelectItem value="in-production">En production</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleSendQuote(selectedRequest.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier le devis
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quote Modal */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un devis - {selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                id="price"
                type="number"
                value={quoteForm.price}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Prix en euros"
              />
            </div>

            <div>
              <Label htmlFor="mockupUrl">URL de l'aperçu/mockup</Label>
              <Input
                id="mockupUrl"
                value={quoteForm.mockupUrl}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, mockupUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="message">Message pour le client</Label>
              <Textarea
                id="message"
                value={quoteForm.message}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Décrivez votre proposition..."
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsQuoteModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmitQuote}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer le devis
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}