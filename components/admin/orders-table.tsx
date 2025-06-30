"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Eye, 
  Package, 
  CreditCard, 
  Truck,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

// Mock orders data
const mockOrders = [
  {
    id: 'UK496266',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    status: 'delivered',
    paymentStatus: 'completed',
    total: 1860,
    paidAmount: 1860,
    items: [
      { name: 'Carte de mariage élégante', quantity: 50, price: 15 },
      { name: 'Dragées personnalisées', quantity: 100, price: 8 }
    ],
    createdAt: '2024-03-15T10:30:00Z',
    deliveredAt: '2024-03-22T14:20:00Z'
  },
  {
    id: 'UK123455',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.martin@email.com',
    status: 'in_production',
    paymentStatus: 'partial',
    total: 405.9,
    paidAmount: 121.77, // 30%
    items: [
      { name: 'Faire-part baby shower', quantity: 30, price: 12 }
    ],
    createdAt: '2024-03-10T14:20:00Z'
  },
  {
    id: 'UK867012',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@email.com',
    status: 'processing',
    paymentStatus: 'completed',
    total: 282.5,
    paidAmount: 282.5,
    items: [
      { name: 'Invitations anniversaire', quantity: 25, price: 10 }
    ],
    createdAt: '2024-03-18T09:15:00Z'
  }
];

const statusConfig = {
  processing: { label: 'En traitement', color: 'bg-blue-600' },
  in_production: { label: 'En production', color: 'bg-purple-600' },
  shipped: { label: 'Expédiée', color: 'bg-indigo-600' },
  delivered: { label: 'Livrée', color: 'bg-green-600' },
  cancelled: { label: 'Annulée', color: 'bg-red-600' }
};

const paymentStatusConfig = {
  partial: { label: 'Acompte reçu', color: 'bg-orange-600' },
  completed: { label: 'Payée', color: 'bg-green-600' },
  pending: { label: 'En attente', color: 'bg-yellow-600' }
};

interface OrdersTableProps {
  searchTerm: string;
  statusFilter: string;
}

export function OrdersTable({ searchTerm, statusFilter }: OrdersTableProps) {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success('Statut de commande mis à jour !');
  };

  const handleSendPaymentLink = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.paymentStatus === 'partial') {
      const remainingAmount = order.total - order.paidAmount;
      toast.success(`Lien de paiement pour ${remainingAmount.toFixed(2)}€ envoyé au client !`);
    }
  };

  const handleMarkAsShipped = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'shipped' } : order
    ));
    toast.success('Commande marquée comme expédiée !');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Commande</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Produits</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Paiement</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-600">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {order.items.map((item, index) => (
                          <div key={index}>
                            {item.name} (x{item.quantity})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{order.total.toFixed(2)}€</td>
                    <td className="p-4">
                      <Badge className={paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig].color}>
                        {paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig].label}
                      </Badge>
                      <div className="text-xs text-gray-600 mt-1">
                        {order.paidAmount.toFixed(2)}€ / {order.total.toFixed(2)}€
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{formatDate(order.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.paymentStatus === 'partial' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendPaymentLink(order.id)}
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                        {order.status === 'in_production' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsShipped(order.id)}
                          >
                            <Truck className="h-4 w-4" />
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la commande {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Client</h4>
                  <p>{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-medium">Date de commande</h4>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Produits commandés</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{item.name}</span>
                      <span>{item.quantity} × {item.price}€ = {(item.quantity * item.price).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Total</h4>
                  <p className="text-lg font-semibold">{selectedOrder.total.toFixed(2)}€</p>
                </div>
                <div>
                  <h4 className="font-medium">Montant payé</h4>
                  <p className="text-lg font-semibold text-green-600">{selectedOrder.paidAmount.toFixed(2)}€</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Select 
                  value={selectedOrder.status} 
                  onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">En traitement</SelectItem>
                    <SelectItem value="in_production">En production</SelectItem>
                    <SelectItem value="shipped">Expédiée</SelectItem>
                    <SelectItem value="delivered">Livrée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
                
                {selectedOrder.paymentStatus === 'partial' && (
                  <Button onClick={() => handleSendPaymentLink(selectedOrder.id)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Demander le solde
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}