import { useState, useCallback, useEffect } from 'react';
import '../../styles/Slider.scss';

// import phoneBanner1 from '../../public/img/slider/BannerPhone1.p';
import Banner1 from '../../../public/img/slider/Banner1.png';
import phoneBanner1 from '../../../public/img/slider/BannerPhone1.png';

const SLIDES = [
  {
    images: {
      mobile: phoneBanner1,
      tablet: Banner1,
      desktop: Banner1,
    },
    alt: 'iPhone 15 Pro',
  },
  {
    images: {
      mobile: phoneBanner1,
      tablet: Banner1,
      desktop: Banner1,
    },
    alt: 'iPhone 14 Pro',
  },
  {
    images: {
      mobile: phoneBanner1,
      tablet: Banner1,
      desktop: Banner1,
    },
    alt: 'iPhone 14 Pro Max',
  },
];

export const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__button slider__button--prev"
          onClick={prevSlide}
        >
          ←
        </button>

        <div className="slider__viewport">
          <div
            className="slider__track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {SLIDES.map((slide, index) => (
              <div key={slide.alt} className="slider__slide">
                <picture className="slider__picture">
                  <source
                    media="(min-width: 1200px)"
                    srcSet={slide.images.desktop}
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet={slide.images.tablet}
                  />
                  <img
                    className="slider__image"
                    src={slide.images.mobile}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider__button slider__button--next"
          onClick={nextSlide}
        >
          →
        </button>
      </div>

      <div className="slider__dots">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`slider__dot ${
              index === activeSlide ? 'slider__dot--active' : ''
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
