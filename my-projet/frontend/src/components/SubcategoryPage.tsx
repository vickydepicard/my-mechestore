import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import ProductModal from "./ProductModal";

interface Product {
  _id: string;
  name: string;
  images: string[];
  description?: string;
  price: number;
}

export default function SubcategoryProductsPage() {
  const { categorySlug, itemSlug } = useParams<{ categorySlug: string; itemSlug: string }>();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/categories/${categorySlug}/items/${itemSlug}/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur : ", err);
        setError(err.message);
        setLoading(false);
      });
  }, [categorySlug, itemSlug]);

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  if (loading) return <p className="text-center py-10">Chargement…</p>;
  if (error) return <p className="text-center text-red-500 py-10">Erreur : {error}</p>;
  if (!items.length) return <p className="text-center py-10">Aucun produit trouvé</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 capitalize">
          {itemSlug?.replace(/-/g, " ")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
            >
              <div className="overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="object-contain max-h-48 transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="font-medium text-gray-800 text-base line-clamp-2">{p.name}</h3>
                  <p className="text-pink-600 font-bold text-lg mt-2">{p.price.toFixed(2)} €</p>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full text-sm font-semibold transition"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={() => openModal(p)}
                    className="w-full border border-pink-500 text-pink-500 hover:bg-pink-50 py-2 rounded-full text-sm font-medium"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            isOpen={!!selectedProduct}
            onRequestClose={closeModal}
            product={selectedProduct}
          />
        )}
      </div>
    </section>
  );
}
