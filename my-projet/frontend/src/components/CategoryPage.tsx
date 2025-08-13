import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Subcat {
  parent: string;
  parentSlug: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [subcats, setSubcats] = useState<Subcat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/subcategories`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((all: Subcat[]) => {
        const filtered = all.filter(sc => sc.parentSlug === categorySlug);
        setSubcats(filtered);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  const title = categorySlug?.replace(/-/g, " ");

  return (
    <div className="max-w-6xl mx-auto pt-[calc(32px+48px+32px)] pb-12 px-4 md:px-8 bg-white">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 capitalize text-center">
        {title}
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-6">
          Erreur lors du chargement : {error}
        </p>
      )}

      {loading ? (
        <div className="text-center text-pink-600 text-lg py-12">Chargement…</div>
      ) : subcats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subcats.map(sc => (
            <Link
              to={`/category/${categorySlug}/${sc.slug}`}
              key={sc.slug}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <img
                src={sc.imageUrl}
                alt={sc.name}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {sc.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">Aucune sous‑catégorie disponible.</p>
      )}

      <section className="prose prose-pink max-w-none mt-12 text-gray-700 mx-auto">
        <h2>À propos dedddd {title}</h2>
        <p>
          Parcourez notre sélection exclusive de sous-catégories pour affiner
          votre choix dans la catégorie <strong>{title}</strong>.
        </p>
      </section>
    </div>
  );
}
