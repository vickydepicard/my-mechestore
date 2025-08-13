import { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext"; 
import ProductModal from "../ProductModal";
import { Product } from "../types/Product"; // Utiliser le type partagé

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/products/new-arrivals")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur : ", err);
        setLoading(false);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) return <p className="text-center py-10">Chargement…</p>;
  if (!items.length) return <p className="text-center py-10">Aucun produit trouvé</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Nos Produits</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p) => (
            <div key={p._id} className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition duration-300 flex flex-col">
              <div className="overflow-hidden rounded-t-xl bg-white-50 flex items-center justify-center p-4">
                {/* image[0] car image est un tableau */}
                <img
                  src={p.image[0] ?? "/placeholder.jpg"}
                  alt={p.name}
                  className="object-contain max-h-48 transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="font-medium text-gray-800 text-base line-clamp-2">{p.name}</h3>
                  <p className="text-pink-600 font-bold text-lg mt-2">{p.price?.toFixed(2)} €</p>
                </div>

                <div className="mt-4 space-y-2">
<button
  onClick={() => {
    if (p.price === undefined) return; // Ignore si prix non défini
    addToCart({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.image[0] ?? "/placeholder.jpg", // première image
      quantity: 1,
    });
  }}
  className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full text-sm font-semibold transition"
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
