// BestSellerSlider.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/swiper-bundle.css';

export default function BestSellerSlider() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products/best-sellers")
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  if (!products.length) {
    return <p className="text-center py-8 text-gray-500">Chargement…</p>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Meilleures ventes</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
        >
          {products.map(p => (
            <SwiperSlide key={p._id} className="flex justify-center">
              <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative group">
                  <img
                    loading="lazy"
                    src={p.image}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={p.name}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{p.name}</h3>
                  <p className="text-xl font-bold text-pink-600 mt-2">
                    {p.price?.toFixed(2)} €
                  </p>
                  <button className="mt-4 w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
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
