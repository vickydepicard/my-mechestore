// src/components/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="bg-[url('/hero.jpg')] bg-cover bg-center h-[80vh] flex items-center justify-center">
        <div className="bg-black/50 p-6 rounded-xl text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Des mèches de qualité pour sublimer votre beauté
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Tissages, perruques, accessoires : tout ce qu’il vous faut.
          </p>
          <a
            href="#categories"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Découvrir nos collections
          </a>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Nos catégories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Catégorie 1 */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Tissages" className="w-full h-60 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">Tissages</h3>
              <p className="text-sm text-gray-600 mb-4">Tissages brésiliens, péruviens, naturels de qualité supérieure.</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Voir plus</button>
            </div>
          </div>

          {/* Catégorie 2 */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Perruques" className="w-full h-60 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">Perruques</h3>
              <p className="text-sm text-gray-600 mb-4">Perruques lace frontal, closure, avec différentes textures et longueurs.</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Voir plus</button>
            </div>
          </div>

          {/* Catégorie 3 */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Accessoires" className="w-full h-60 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">Accessoires</h3>
              <p className="text-sm text-gray-600 mb-4">Bonnets, colles, soins capillaires et autres indispensables.</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Voir plus</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 bg-pink-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Besoin d’aide pour choisir ?</h2>
        <p className="mb-6">Contactez notre équipe et obtenez des conseils personnalisés gratuitement.</p>
        <a
          href="#contact"
          className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded hover:bg-gray-100"
        >
          Contactez-nous
        </a>
      </section>
    </div>
  );
}