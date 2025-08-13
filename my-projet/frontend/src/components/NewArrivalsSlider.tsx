import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";
import ProductModal from "./ProductModal";
import { Product } from "../components/types/Product";

export default function NewArrivalsSlider() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:4000/api/products/new-arrivals")
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
        setError("Impossible de charger les produits");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    const price = product.variants?.[0]?.prix ?? product.price ?? 0;
    const image = product.image?.[0] ?? "/placeholder.jpg";

    addToCart({
      _id: product._id,
      name: product.name,
      price,
      image,
      quantity: 1,
    });
  };

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  if (loading) return <p className="text-center py-10">Chargement…</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!items.length) return <p className="text-center py-10">Aucun produit trouvé</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🆕 Nouveautés</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
            >
              <div className="overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={p.image?.[0] ?? "/placeholder.jpg"}
                  alt={p.name}
                  className="object-contain max-h-48 transition-transform duration-300 hover:scale-105 cursor-pointer"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="font-medium text-gray-800 text-base line-clamp-2">{p.name}</h3>
                  <p className="text-pink-600 font-bold text-lg mt-2">
                    {(p.variants?.[0]?.prix ?? p.price ?? 0).toLocaleString()} FCFA
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleAddToCart(p)}
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
    product={{
      ...selectedProduct,
      image: [selectedProduct.image?.[0] ?? "/placeholder.jpg"], // tableau maintenant
    }}
  />
)}

      </div>
    </section>
  );
}
