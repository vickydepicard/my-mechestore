
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import slide1 from '../assets/images/image1.png';
import slide2 from '../assets/images/image2.png';
import slide3 from '../assets/images/image.png';

interface Slide {
  img: string;
  title: string;
  subtitle?: string;
  cta: string;
  link?: string;
}

export default function HeroSlider() {
  const slides: Slide[] = [
    {
      img: slide1,
      title: 'N°1 du tissage brésilien en France',
      subtitle: 'Cheveux 100 % naturels • Brillance & tenue longue durée',
      cta: 'Voir la collection',
      link: '/collection/tissage-bresilien',
    },
    {
      img: slide2,
      title: 'Perruques de qualité supérieure',
      subtitle: 'Matières douces, coupes stylées, confort optimal',
      cta: 'Découvrir les perruques',
      link: '/categorie/perruques',
    },
    {
      img: slide3,
      title: 'Accessoires indispensables',
      subtitle: 'Brosses, care kits & plus pour sublimer vos cheveux',
      cta: 'Voir les accessoires',
      link: '/categorie/accessoires',
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className="h-auto"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <a href={slide.link || '#'} className="group block">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full block transition-transform duration-500 group-hover:scale-105"
            />
            <div className="py-8 text-center bg-white">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-gray-600 text-sm md:text-base mb-4 px-4 md:px-0">
                  {slide.subtitle}
                </p>
              )}
              <button className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full transition-transform transform hover:-translate-y-1">
                {slide.cta}
              </button>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
