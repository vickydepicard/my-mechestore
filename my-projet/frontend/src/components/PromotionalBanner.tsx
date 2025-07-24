import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Promotion {
  nom: string;
  description: string;
  badge_texte?: string;
  couleur_badge?: string;
}

interface Product {
  _id: string;
  slug: string;
  images: string[];
  promotion?: Promotion & { active: boolean };
  name: string;
}

interface PromoState {
  nom: string;
  description: string;
  badge_texte: string;
  couleur_badge: string;
  id: string;
  image: string;
}

const PromotionalBanner: React.FC = () => {
  const [promotion, setPromotion] = useState<PromoState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); // 1 heure (exemple)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:4000/api/promotions');
        const produits = response.data;
        const produitPromo = produits.find((prod) => prod.promotion && prod.promotion.active === true);

        if (produitPromo && produitPromo.promotion) {
          setPromotion({
            nom: produitPromo.promotion.nom,
            description: produitPromo.promotion.description,
            badge_texte: produitPromo.promotion.badge_texte || 'Promo',
            couleur_badge: produitPromo.promotion.couleur_badge || '#E53E3E',
            id: produitPromo._id,
            image: produitPromo.images[0] || '',
          });
        } else {
          setPromotion(null);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de la promotion :', err);
        setError('Impossible de charger la promotion.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (loading) {
    return <div className="w-full py-6 text-center text-gray-500">Chargement de la promotion...</div>;
  }

  if (error) {
    return <div className="w-full py-6 text-center text-red-600">{error}</div>;
  }

  if (!promotion) return null;

  return (
    <div className="w-full bg-gradient-to-r from-rose-100 to-pink-200 py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Texte */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-800">{promotion.nom}</h2>
          <p className="text-gray-700 text-base md:text-lg">{promotion.description}</p>

          {/* Compte à rebours */}
          <div className="mt-2 inline-block px-4 py-2 bg-white border border-pink-300 text-pink-700 rounded-full font-semibold shadow-sm text-sm">
            {timeLeft > 0 ? `Temps restant : ${formatTime(timeLeft)}` : 'Promotion terminée'}
          </div>
        </div>

        {/* Image & badge */}
        <div className="flex-1 text-center">
          <Link to={`/produit/${promotion.id}`} className="inline-block" aria-label={`Voir le produit ${promotion.nom}`}>
            <div className="relative inline-block">
              <img
                src={promotion.image}
                alt={`Image du produit ${promotion.nom}`}
                className="h-48 w-auto object-contain rounded-xl shadow-md"
              />
              <span
                className={`absolute top-0 left-0 px-3 py-1 text-white text-xs font-bold rounded-br-xl animate-pulse`}
                style={{ backgroundColor: promotion.couleur_badge }}
              >
                {promotion.badge_texte}
              </span>
            </div>
          </Link>

          {/* Bouton découvrir */}
          <div className="mt-4">
            <Link
              to={`/produit/${promotion.id}`}
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              Découvrir l’offre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
