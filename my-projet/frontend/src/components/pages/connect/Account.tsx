// src/pages/Account.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './authContext';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:4000/api/orders/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Erreur chargement commandes:', err));
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">Vous devez vous connecter pour accéder à votre espace.</p>
        <Link to="/login" className="text-blue-500 underline">Se connecter</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bienvenue, {user.name}</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Vos commandes :</h3>
      {orders.length === 0 ? (
        <p>Aucune commande enregistrée.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order: any) => (
            <li
              key={order._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p className="font-semibold">Commande n° {order.orderId}</p>
              <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total : {order.total} FCFA</p>
              <Link
                to={`/invoice/${order._id}`}
                className="text-sm text-blue-600 underline"
              >
                Voir la facture
              </Link>
              <br />
              <Link
                to={`/payment/${order._id}`}
                className="text-sm text-green-600 underline"
              >
                Payer maintenant
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
