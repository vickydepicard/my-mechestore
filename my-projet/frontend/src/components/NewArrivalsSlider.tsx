import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export default function NewArrivalsSlider() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/products/new-arrivals")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des nouveautés :", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-400 text-lg">
        Chargement des nouveautés…
      </p>
    );

  if (!items.length)
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Aucun nouveau produit trouvé.
      </p>
    );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center mb-2">
            <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 font-semibold rounded-full mr-2">
              🆕 New
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900">Nouveautés</h2>
          </div>
          <p className="text-gray-600 mt-2 text-lg">
            Découvrez nos derniers produits ajoutés
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {items.map((p) => (
            <SwiperSlide key={p._id} className="flex justify-center">
              <div className="w-full max-w-xs bg-white rounded-2xl border border-gray-200 shadow hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
<div className="relative overflow-hidden rounded-t-2xl h-36 flex items-center justify-center">
  <img
    src={p.image}
    alt={p.name}
    loading="lazy"
    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 mx-auto"
  />
  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full shadow">
    Nouveau
  </span>
</div>

                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-xl font-bold text-pink-600 mt-2">
                    {p.price.toFixed(2)} €
                  </p>
                  <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white w-full py-1.5 rounded-full text-sm font-semibold transition duration-300">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
