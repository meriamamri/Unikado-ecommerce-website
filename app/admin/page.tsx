"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Users, 
  MessageSquare, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Send,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CustomRequestsTable } from '@/components/admin/custom-requests-table';
import { OrdersTable } from '@/components/admin/orders-table';
import { UsersTable } from '@/components/admin/users-table';
import { MessagesTable } from '@/components/admin/messages-table';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Demandes personnalisées',
    value: '24',
    change: '+12%',
    icon: Package,
    color: 'text-blue-600'
  },
  {
    title: 'Commandes actives',
    value: '156',
    change: '+8%',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    title: 'Clients totaux',
    value: '2,847',
    change: '+23%',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: 'Messages non lus',
    value: '12',
    change: '-5%',
    icon: MessageSquare,
    color: 'text-orange-600'
  }
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord administrateur
          </h1>
          <p className="text-gray-600">
            Gérez les commandes, demandes personnalisées et clients
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className={`text-sm ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change} ce mois
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="custom-requests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="custom-requests">Demandes personnalisées</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="custom-requests">
              <CustomRequestsTable searchTerm={searchTerm} statusFilter={statusFilter} />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTable searchTerm={searchTerm} statusFilter={statusFilter} />
            </TabsContent>

            <TabsContent value="users">
              <UsersTable searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesTable searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}