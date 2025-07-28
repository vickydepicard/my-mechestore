import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Inscription échouée');
      const userData = await res.json();

      login(userData); // stocke l’utilisateur
      navigate('/account'); // redirection tableau de bord
    } catch (err) {
      setError((err as Error).message || 'Erreur');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Créer un compte</h2>
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          onChange={handleChange}
          value={formData.name}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          onChange={handleChange}
          value={formData.email}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          value={formData.password}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
