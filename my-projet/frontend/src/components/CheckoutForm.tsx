import React, { useState } from 'react';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    paymentMethod: '' // stripe | paypal (à activer plus tard)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Commande soumise:', formData);
    alert("Commande en cours de traitement...");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Informations de livraison</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Nom complet"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Pays"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Code postal"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        />
        <select
          name="paymentMethod"
          className="p-2 border rounded"
          required
          onChange={handleChange}
        >
          <option value="">Méthode de paiement</option>
          <option value="stripe">Carte bancaire (Stripe)</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
      >
        Finaliser la commande
      </button>
    </form>
  );
};

export default CheckoutForm;
