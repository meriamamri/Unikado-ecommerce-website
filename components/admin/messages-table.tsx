"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Eye, 
  Reply, 
  Mail,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';

// Mock messages data
const mockMessages = [
  {
    id: 'M001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    subject: 'Question sur ma commande UK496266',
    message: 'Bonjour, j\'aimerais savoir si ma commande est bien en cours de production. J\'ai hâte de recevoir mes cartes de mariage !',
    reason: 'Suivi de commande',
    status: 'unread',
    createdAt: '2024-03-21T10:30:00Z',
    adminReply: null
  },
  {
    id: 'M002',
    customerName: 'Thomas Martin',
    customerEmail: 'thomas.martin@email.com',
    subject: 'Demande de modification',
    message: 'Bonjour, est-il possible de modifier la couleur de mes faire-part baby shower ? Je préférerais du bleu au lieu du vert.',
    reason: 'Problème avec une commande',
    status: 'replied',
    createdAt: '2024-03-20T14:15:00Z',
    adminReply: 'Bonjour Thomas, nous pouvons effectuer cette modification. Je vous envoie un nouveau devis par email.'
  },
  {
    id: 'M003',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@email.com',
    subject: 'Félicitations pour le service',
    message: 'Je tenais à vous remercier pour la qualité exceptionnelle de mes invitations d\'anniversaire. Mes invités ont été impressionnés !',
    reason: 'Autre',
    status: 'unread',
    createdAt: '2024-03-19T16:45:00Z',
    adminReply: null
  },
  {
    id: 'M004',
    customerName: 'Pierre Dubois',
    customerEmail: 'pierre.dubois@email.com',
    subject: 'Demande de devis personnalisé',
    message: 'Bonjour, je souhaiterais un devis pour des cartes de remerciement de mariage avec un design très spécifique. Pouvons-nous en discuter ?',
    reason: 'Demande de devis personnalisé',
    status: 'in-progress',
    createdAt: '2024-03-18T11:20:00Z',
    adminReply: null
  }
];

const statusConfig = {
  unread: { label: 'Non lu', color: 'bg-red-600' },
  'in-progress': { label: 'En cours', color: 'bg-yellow-600' },
  replied: { label: 'Répondu', color: 'bg-green-600' },
  closed: { label: 'Fermé', color: 'bg-gray-600' }
};

interface MessagesTableProps {
  searchTerm: string;
}

export function MessagesTable({ searchTerm }: MessagesTableProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const filteredMessages = messages.filter(message => {
    return message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    // Mark as read if it was unread
    if (message.status === 'unread') {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: 'in-progress' } : m
      ));
    }
  };

  const handleReply = (message: any) => {
    setSelectedMessage(message);
    setReplyText('');
    setIsReplyModalOpen(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Veuillez saisir une réponse');
      return;
    }

    setMessages(prev => prev.map(message => 
      message.id === selectedMessage.id 
        ? { ...message, adminReply: replyText, status: 'replied' }
        : message
    ));

    toast.success('Réponse envoyée au client !');
    setIsReplyModalOpen(false);
    setReplyText('');
  };

  const handleStatusChange = (messageId: string, newStatus: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId ? { ...message, status: newStatus } : message
    ));
    toast.success('Statut du message mis à jour !');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Sujet</th>
                  <th className="text-left p-4 font-medium">Motif</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{message.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{message.customerName}</div>
                        <div className="text-sm text-gray-600">{message.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs truncate" title={message.subject}>
                        {message.subject}
                      </div>
                    </td>
                    <td className="p-4 text-sm">{message.reason}</td>
                    <td className="p-4 text-sm">{formatDate(message.createdAt)}</td>
                    <td className="p-4">
                      <Badge className={statusConfig[message.status as keyof typeof statusConfig].color}>
                        {statusConfig[message.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReply(message)}
                        >
                          <Reply className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Message Details Modal */}
      {selectedMessage && !isReplyModalOpen && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message {selectedMessage.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Client
                  </h4>
                  <p>{selectedMessage.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedMessage.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Date
                  </h4>
                  <p>{formatDate(selectedMessage.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Sujet</h4>
                <p className="text-gray-700">{selectedMessage.subject}</p>
              </div>

              <div>
                <h4 className="font-medium">Motif</h4>
                <p className="text-gray-700">{selectedMessage.reason}</p>
              </div>

              <div>
                <h4 className="font-medium">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedMessage.message}</p>
                </div>
              </div>

              {selectedMessage.adminReply && (
                <div>
                  <h4 className="font-medium">Votre réponse</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700">{selectedMessage.adminReply}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button onClick={() => handleReply(selectedMessage)}>
                  <Reply className="h-4 w-4 mr-2" />
                  {selectedMessage.adminReply ? 'Répondre à nouveau' : 'Répondre'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleStatusChange(selectedMessage.id, 'closed')}
                >
                  Marquer comme fermé
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reply Modal */}
      <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Répondre à {selectedMessage?.customerName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Message original :</h4>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                {selectedMessage?.message}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Votre réponse :</h4>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tapez votre réponse ici..."
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsReplyModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendReply}>
                <Mail className="h-4 w-4 mr-2" />
                Envoyer la réponse
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}