import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Product = { _id: string; name: string; images: string[]; price: number; currency: string };

export default function CategoryView() {
  const { categorySlug, itemSlug } = useParams<{ categorySlug: string; itemSlug: string }>();
  const [prods, setProds] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/categories/${categorySlug}/products`)
      .then(r => r.json())
      .then(setProds)
      .catch(console.error);
  }, [categorySlug, itemSlug]);

  return (
    <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {prods.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
