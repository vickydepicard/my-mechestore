import React, { useEffect, useState } from 'react';
import { useCart } from '../../CartContext';
import { useAuth } from './authContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);

  useEffect(() => {
    // Simule les achats stockés localement ou récupérés depuis un backend
    const purchases = localStorage.getItem('purchasedItems');
    if (purchases) {
      setPurchasedItems(JSON.parse(purchases));
    }
  }, []);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-xl text-center text-red-600 font-semibold">Vous devez être connecté pour accéder à votre espace personnel.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Mon espace personnel</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Produits dans le panier</h2>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map(product => (
              <div key={product._id} className="border rounded-xl shadow hover:shadow-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.price.toLocaleString()} FCFA</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Aucun produit dans votre panier.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">✅ Produits achetés</h2>
        {purchasedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedItems.map(product => (
              <div key={product._id} className="border rounded-xl shadow hover:shadow-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.price.toLocaleString()} FCFA</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Aucun produit acheté pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
