// src/components/TopCategoriesSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Item {
  name: string;
  slug: string;
  description: string;
  metadata: { displayOrder: number };
}

interface Category {
  name: string;
  slug: string;
  description: string;
  items: Item[];
  metadata: { displayOrder: number; isActive: boolean };
}

interface Props {
  categories: Category[];
}

export default function TopCategoriesSection({ categories }: Props) {
  const navigate = useNavigate();

  // Trier les catégories et leurs sous-items
  const sortedCats = [...categories]
    .filter(c => c.metadata.isActive)
    .sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Top Categories
        </h2>
        <p className="text-gray-600 mt-2">
          Découvrez nos meilleures catégories de mèches, extensions et accessoires.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {sortedCats.map(cat => (
          <div
            key={cat.slug}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            onClick={() => navigate(`/category/${cat.slug}`)}
            role="button"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h3>
            <ul className="text-gray-600 text-sm flex-1 mb-4 space-y-1">
              {cat.items
                .sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder)
                .slice(0, 3)
                .map(item => (
                  <li key={item.slug}>{item.name}</li>
                ))}
            </ul>
            <span className="mt-auto inline-block text-pink-600 font-medium">
              Voir tous →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
