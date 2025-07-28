// src/pages/PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ProductVariant {
  longueur: string;
  couleur: string;
  prix: number;
  stock: number;
}

interface OrderItem {
  _id: string;
  name: string;
  image: string;
  variant: ProductVariant;
  quantity: number;
  devise: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

const PaymentPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Simule une requête vers le backend pour récupérer la commande
    const fakeOrder: Order = {
      id: orderId || '',
      items: JSON.parse(localStorage.getItem('checkout_items') || '[]'),
      total: parseInt(localStorage.getItem('checkout_total') || '0'),
      status: 'En attente',
      createdAt: new Date().toISOString(),
    };
    setOrder(fakeOrder);
  }, [orderId]);

  const handlePayment = () => {
    // Simule un paiement réussi
    navigate(`/invoice/${order?.id}`);
  };

  if (!order) return <div className="p-4">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🎯 Étape 3 : Paiement de la commande</h2>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item._id + item.variant.longueur + item.variant.couleur} className="flex gap-4 border p-3 rounded-lg">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                Longueur: {item.variant.longueur} | Couleur: {item.variant.couleur}
              </p>
              <p className="text-sm">
                Prix unitaire: <strong>{item.variant.prix.toLocaleString()} {item.devise}</strong>
              </p>
              <p className="text-sm">Quantité: {item.quantity}</p>
              <p className="text-sm font-medium text-pink-600">
                Total: {(item.variant.prix * item.quantity).toLocaleString()} {item.devise}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <p className="text-lg font-semibold">Montant à payer : {order.total.toLocaleString()} FCFA</p>

        <button
          onClick={handlePayment}
          className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
        >
          Payer maintenant
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;