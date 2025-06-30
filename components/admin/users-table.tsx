"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Eye, 
  Mail, 
  Calendar,
  Package,
  DollarSign
} from 'lucide-react';

// Mock users data
const mockUsers = [
  {
    id: 'U001',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 1 23 45 67 89',
    joinDate: '2023-06-15',
    totalOrders: 12,
    totalSpent: 1250.50,
    lastOrderDate: '2024-03-15',
    status: 'active'
  },
  {
    id: 'U002',
    name: 'Thomas Martin',
    email: 'thomas.martin@email.com',
    phone: '+33 1 98 76 54 32',
    joinDate: '2023-08-22',
    totalOrders: 8,
    totalSpent: 890.30,
    lastOrderDate: '2024-03-10',
    status: 'active'
  },
  {
    id: 'U003',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@email.com',
    phone: '+33 1 45 67 89 12',
    joinDate: '2023-12-05',
    totalOrders: 3,
    totalSpent: 245.80,
    lastOrderDate: '2024-02-28',
    status: 'active'
  },
  {
    id: 'U004',
    name: 'Pierre Dubois',
    email: 'pierre.dubois@email.com',
    phone: '+33 1 34 56 78 90',
    joinDate: '2023-04-10',
    totalOrders: 15,
    totalSpent: 2150.75,
    lastOrderDate: '2024-03-20',
    status: 'vip'
  }
];

const statusConfig = {
  active: { label: 'Actif', color: 'bg-green-600' },
  vip: { label: 'VIP', color: 'bg-purple-600' },
  inactive: { label: 'Inactif', color: 'bg-gray-600' }
};

interface UsersTableProps {
  searchTerm: string;
}

export function UsersTable({ searchTerm }: UsersTableProps) {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">Utilisateur</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Inscription</th>
                  <th className="text-left p-4 font-medium">Commandes</th>
                  <th className="text-left p-4 font-medium">Total dépensé</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{user.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{user.email}</div>
                        <div className="text-gray-600">{user.phone}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{formatDate(user.joinDate)}</td>
                    <td className="p-4">
                      <div className="text-center">
                        <div className="font-semibold">{user.totalOrders}</div>
                        <div className="text-xs text-gray-600">
                          Dernière: {formatDate(user.lastOrderDate)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-green-600">
                      {user.totalSpent.toFixed(2)}€
                    </td>
                    <td className="p-4">
                      <Badge className={statusConfig[user.status as keyof typeof statusConfig].color}>
                        {statusConfig[user.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`mailto:${user.email}`)}
                        >
                          <Mail className="h-4 w-4" />
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

      {/* User Details Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Profil utilisateur - {selectedUser.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informations personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nom :</strong> {selectedUser.name}</div>
                    <div><strong>Email :</strong> {selectedUser.email}</div>
                    <div><strong>Téléphone :</strong> {selectedUser.phone}</div>
                    <div><strong>Inscription :</strong> {formatDate(selectedUser.joinDate)}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Statistiques</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{selectedUser.totalOrders} commandes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{selectedUser.totalSpent.toFixed(2)}€ dépensés</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Dernière commande: {formatDate(selectedUser.lastOrderDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Statut du compte</h4>
                <Badge className={statusConfig[selectedUser.status as keyof typeof statusConfig].color}>
                  {statusConfig[selectedUser.status as keyof typeof statusConfig].label}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => window.open(`mailto:${selectedUser.email}`)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un email
                </Button>
                <Button variant="outline">
                  Voir les commandes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}