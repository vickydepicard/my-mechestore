import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../components/types/Product';
import ProductCard from './ProductCard';

export default function CategoryView() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/categories/${categorySlug}/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Impossible de charger les produits.');
        setLoading(false);
      });
  }, [categorySlug]);

  if (loading) return <p className="text-center py-10">Chargement…</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!products.length) return <p className="text-center py-10">Aucun produit dans cette catégorie.</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
