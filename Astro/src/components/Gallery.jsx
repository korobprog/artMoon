import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export default function Gallery({ images }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative h-screen w-full bg-black text-white">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        onInit={(swiper) => {
          // Установка ссылок на кнопки после инициализации Swiper
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          // Обновление навигации после изменения параметров
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="h-full w-full"
        onSlideChange={(swiper) => {
          console.log('Slide changed. Current index:', swiper.activeIndex);
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id || index}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
                <div className="text-lg md:text-xl">
                  <p>{image.location}</p>
                  <p className="text-2xl md:text-4xl font-bold mt-2">
                    {image.artist}
                  </p>
                  <p className="mt-1">{image.title}</p>
                  <p className="mt-1">{image.date}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-lg md:text-xl underline cursor-default">
                    Explore Now
                  </span>
                  <p className="text-lg md:text-xl">
                    {index + 1}/{images.length}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кастомные кнопки навигации с использованием refs */}
      <div
        ref={prevRef}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl text-white hover:opacity-80 z-50 cursor-pointer p-4 select-none"
      >
        ‹
      </div>
      <div
        ref={nextRef}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-4xl text-white hover:opacity-80 z-50 cursor-pointer p-4 select-none"
      >
        ›
      </div>
    </div>
  );
}
