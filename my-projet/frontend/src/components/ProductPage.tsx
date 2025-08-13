import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductPage() {
  const { subcategorySlug } = useParams<{ subcategorySlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/products/${subcategorySlug}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [subcategorySlug]);

  return (
    <div className="max-w-6xl mx-auto pt-12 pb-12 px-4 md:px-8 bg-white">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 text-center">
        Produits de la sous-catégorie {subcategorySlug}
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-6">
          Erreur lors du chargement : {error}
        </p>
      )}

      {loading ? (
        <div className="text-center text-pink-600 text-lg py-12">Chargement…</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.name} className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-xl font-bold text-pink-600">{product.price} €</p>
                <div className="mt-4">
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                    Ajouter au panier
                  </button>
                  <button className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">Aucun produit disponible.</p>
      )}
    </div>
  );
}
