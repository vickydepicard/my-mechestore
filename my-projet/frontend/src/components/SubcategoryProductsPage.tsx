import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { Product, CartItem } from "./types";

export default function SubcategoryProductsPage() {
  const { categorySlug, itemSlug } = useParams<{ categorySlug: string; itemSlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/categories/${categorySlug}/items/${itemSlug}/products`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [categorySlug, itemSlug]);

  const handleAddToCart = (product: Product) => {
    const variant = product.variants?.[0];
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.images?.[0] || "/placeholder.jpg",
      price: variant?.prix ?? product.price,
      quantity: 1,
      stock: variant?.stock,
    };
    addToCart(cartItem);
  };

  if (loading) return <p className="text-center py-10">Chargement…</p>;
  if (error) return <p className="text-center py-10 text-red-500">Erreur : {error}</p>;
  if (!products.length) return <p className="text-center py-10">Aucun produit trouvé</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-600 capitalize">
          {itemSlug?.replace(/-/g, " ")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p._id} className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition flex flex-col">
              <Link to={`/produit/${p._id}`} className="overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center p-4">
                <img src={p.images?.[0] || "/placeholder.jpg"} alt={p.name} className="object-contain max-h-48 transition-transform hover:scale-105 cursor-pointer" />
              </Link>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="font-medium text-gray-800 text-base line-clamp-2">{p.name}</h3>
                  <p className="text-pink-600 font-bold text-lg mt-2">{p.variants?.[0]?.prix?.toLocaleString() ?? p.price?.toLocaleString()} FCFA</p>
                </div>
                <div className="mt-4 space-y-2">
                  <button onClick={() => handleAddToCart(p)} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full text-sm font-semibold transition">
                    Ajouter au panier
                  </button>
                  <Link to={`/produit/${p._id}`} className="block w-full text-center border border-pink-500 text-pink-500 hover:bg-pink-50 py-2 rounded-full text-sm font-medium transition">
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
