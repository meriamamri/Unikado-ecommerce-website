import { notFound } from "next/navigation";
import { OrderDetailClient } from "./order-detail-client";

// Mock order data - in real app, this would come from API
const mockOrders = {
  UK346511: {
    orderNumber: "UK346511",
    status: "processing",
    paymentStatus: "completed",
    createdAt: "2024-03-20T11:30:00Z",
    estimatedDelivery: "2024-03-30T00:00:00Z",
    customer: {
      name: "Test User",
      email: "test@example.com",
      phone: "+33 1 23 45 67 89",
    },
    billing: {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      address: "123 Test Street",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    shipping: {
      firstName: "Test",
      lastName: "User",
      address: "123 Test Street",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    items: [
      {
        id: 7,
        name: "Test Product",
        description: "Test product description",
        image:
          "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 20,
        quantity: 1,
        customization: {
          eventType: "Test",
          theme: "Test",
          color: "Test",
        },
      },
    ],
    pricing: {
      subtotal: 20,
      discount: 0,
      shipping: 5,
      tax: 4,
      total: 29,
    },
  },
  UK496266: {
    orderNumber: "UK496266",
    status: "delivered",
    paymentStatus: "completed",
    createdAt: "2024-03-15T10:30:00Z",
    deliveredAt: "2024-03-22T14:20:00Z",
    estimatedDelivery: "2024-03-22T00:00:00Z",
    customer: {
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 1 23 45 67 89",
    },
    billing: {
      firstName: "Marie",
      lastName: "Dubois",
      email: "marie.dubois@email.com",
      address: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    shipping: {
      firstName: "Marie",
      lastName: "Dubois",
      address: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    items: [
      {
        id: 1,
        name: "Carte de mariage élégante",
        description: "Design sophistiqué avec dorure à chaud",
        image:
          "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 15,
        quantity: 50,
        customization: {
          eventType: "Mariage",
          brideName: "Marie Dubois",
          groomName: "Thomas Martin",
          eventDate: "2024-06-15",
          theme: "Classique",
          color: "Blanc cassé",
        },
      },
      {
        id: 2,
        name: "Dragées personnalisées",
        description: "Boîtes élégantes avec vos noms gravés",
        image:
          "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 8,
        quantity: 100,
        customization: {
          eventType: "Mariage",
          brideName: "Marie Dubois",
          groomName: "Thomas Martin",
          theme: "Vintage",
          color: "Rose poudré",
        },
      },
    ],
    pricing: {
      subtotal: 1550,
      discount: 0,
      shipping: 0,
      tax: 310,
      total: 1860,
    },
    tracking: {
      carrier: "Colissimo",
      trackingNumber: "CP123456789FR",
      trackingUrl: "https://www.laposte.fr/outils/suivre-vos-envois",
    },
  },
  UK123455: {
    orderNumber: "UK123455",
    status: "in_production",
    paymentStatus: "partial",
    createdAt: "2024-03-10T14:20:00Z",
    estimatedDelivery: "2024-03-25T00:00:00Z",
    customer: {
      name: "Sophie Martin",
      email: "sophie.martin@email.com",
      phone: "+33 1 98 76 54 32",
    },
    billing: {
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@email.com",
      address: "456 Avenue des Champs",
      city: "Lyon",
      postalCode: "69001",
      country: "France",
    },
    shipping: {
      firstName: "Sophie",
      lastName: "Martin",
      address: "456 Avenue des Champs",
      city: "Lyon",
      postalCode: "69001",
      country: "France",
    },
    items: [
      {
        id: 4,
        name: "Faire-part baby shower",
        description: "Designs adorables pour annoncer bébé",
        image:
          "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 12,
        quantity: 30,
        customization: {
          eventType: "Baby Shower",
          babyName: "Emma",
          parentNames: "Sophie & Pierre Martin",
          eventDate: "2024-04-15",
          theme: "Pastel",
          color: "Rose et bleu",
        },
      },
    ],
    pricing: {
      subtotal: 360,
      discount: 36,
      shipping: 9.9,
      tax: 72,
      total: 405.9,
    },
  },
  UK123456: {
    orderNumber: "UK123456",
    status: "processing",
    paymentStatus: "completed",
    createdAt: "2024-03-19T13:45:00Z",
    estimatedDelivery: "2024-03-29T00:00:00Z",
    customer: {
      name: "Pierre Leroy",
      email: "pierre.leroy@email.com",
      phone: "+33 1 56 78 90 12",
    },
    billing: {
      firstName: "Pierre",
      lastName: "Leroy",
      email: "pierre.leroy@email.com",
      address: "987 Rue de la République",
      city: "Marseille",
      postalCode: "13001",
      country: "France",
    },
    shipping: {
      firstName: "Pierre",
      lastName: "Leroy",
      address: "987 Rue de la République",
      city: "Marseille",
      postalCode: "13001",
      country: "France",
    },
    items: [
      {
        id: 8,
        name: "Invitations baptême",
        description: "Design délicat pour célébrer ce moment unique",
        image:
          "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 14,
        quantity: 40,
        customization: {
          eventType: "Baptême",
          childName: "Lucas Leroy",
          parentNames: "Pierre & Anne Leroy",
          eventDate: "2024-04-20",
          theme: "Religieux",
          color: "Blanc et or",
        },
      },
    ],
    pricing: {
      subtotal: 560,
      discount: 28,
      shipping: 8,
      tax: 112,
      total: 652,
    },
  },
  UK867012: {
    orderNumber: "UK867012",
    status: "processing",
    paymentStatus: "completed",
    createdAt: "2024-03-18T09:15:00Z",
    estimatedDelivery: "2024-03-28T00:00:00Z",
    customer: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "+33 1 45 67 89 12",
    },
    billing: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      address: "789 Boulevard Saint-Germain",
      city: "Paris",
      postalCode: "75006",
      country: "France",
    },
    shipping: {
      firstName: "Jean",
      lastName: "Dupont",
      address: "789 Boulevard Saint-Germain",
      city: "Paris",
      postalCode: "75006",
      country: "France",
    },
    items: [
      {
        id: 5,
        name: "Invitations anniversaire",
        description: "Design festif pour célébrer en grand",
        image:
          "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=300",
        price: 10,
        quantity: 25,
        customization: {
          eventType: "Anniversaire",
          celebrantName: "Jean Dupont",
          age: "40",
          eventDate: "2024-04-10",
          theme: "Moderne",
          color: "Bleu et argent",
        },
      },
    ],
    pricing: {
      subtotal: 250,
      discount: 25,
      shipping: 7.5,
      tax: 50,
      total: 282.5,
    },
  },
  UK138421: {
    orderNumber: "UK138421",
    status: "shipped",
    paymentStatus: "completed",
    createdAt: "2024-03-12T16:45:00Z",
    estimatedDelivery: "2024-03-26T00:00:00Z",
    customer: {
      name: "Claire Moreau",
      email: "claire.moreau@email.com",
      phone: "+33 1 34 56 78 90",
    },
    billing: {
      firstName: "Claire",
      lastName: "Moreau",
      email: "claire.moreau@email.com",
      address: "321 Rue de Rivoli",
      city: "Paris",
      postalCode: "75004",
      country: "France",
    },
    shipping: {
      firstName: "Claire",
      lastName: "Moreau",
      address: "321 Rue de Rivoli",
      city: "Paris",
      postalCode: "75004",
      country: "France",
    },
    items: [
      {
        id: 6,
      name: "Cartes de remerciement",
      description: "Élégantes cartes pour remercier vos invités",
      image:
        "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300",
      price: 8,
      quantity: 75,
      customization: {
        eventType: "Mariage",
        brideName: "Claire Moreau",
        groomName: "Antoine Dubois",
        eventDate: "2024-02-14",
        theme: "Romantique",
        color: "Rose et doré",
      },
    },
  ],
  pricing: {
    subtotal: 600,
    discount: 60,
    shipping: 8.5,
    tax: 120,
    total: 668.5,
  },
  tracking: {
    carrier: "Chronopost",
    trackingNumber: "CH987654321FR",
    trackingUrl: "https://www.chronopost.fr/tracking-no-cms/suivi-page",
  },
},
};

// Generate static params for all available order IDs
export async function generateStaticParams() {
  const orderIds = Object.keys(mockOrders);

  return orderIds.map((id) => ({
    id: id,
  }));
}

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const orderData = mockOrders[params.id as keyof typeof mockOrders];

  if (!orderData) {
    notFound();
  }

  return <OrderDetailClient order={orderData} />;
}