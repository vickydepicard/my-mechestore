import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import slide1 from '../assets/images/image.png';


export default function HeroSlider() {
  const slides = [
    { img: slide1, title: 'N°1 du tissage brésilien en France', cta: 'Voir la collection' },
    { img: slide1, title: 'Perruques de qualité supérieure', cta: 'Découvrir les perruques' },
    { img: slide1, title: 'Accessoires indispensables', cta: 'Voir les accessoires' },
  ];

  return (
    <Swiper
  modules={[Autoplay, Pagination, Navigation, EffectFade]}
  navigation
  pagination={{ clickable: true }}
  effect="fade"
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop
  className="h-[60vh]"   // <= on limite la hauteur à 60vh
>
  {slides.map((slide, i) => (
    <SwiperSlide key={i}>
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${slide.img})` }}
      >
        <div className="bg-black/40 text-white text-center p-6 rounded-lg max-w-xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
          <button className="mt-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg">
            {slide.cta}
          </button>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  );
}
