import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  
  // Récupère le token depuis localStorage (ou depuis ton contexte auth)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4000/api/orders/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div>
      <h1>Mes commandes</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Commande #{order._id}</p>
          {/* Ajouter ici plus de détails si besoin */}
        </div>
      ))}
    </div>
  );
}
