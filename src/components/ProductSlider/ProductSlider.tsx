import './ProductSlider.scss';
import { ProductCart } from '../ProductCart/ProductCart';
import { Product } from '../../types/product';
import { useRef, useState, useEffect } from 'react';

type Props = {
  FilterredProducts: Product[];
  currentIndex: number;
  onSlide: (index: number) => void;
  isDiscounted: boolean;
  onMaxIndexChange?: (maxIndex: number) => void;
};

export const ProductSlider = ({
  FilterredProducts: products,
  currentIndex,
  onSlide,
  isDiscounted,
  onMaxIndexChange,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [maxIndex, setMaxIndex] = useState(0);

  // Визначаємо кількість видимих карток
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!viewportRef.current || !trackRef.current) return;

      const viewportWidth = viewportRef.current.offsetWidth;
      const firstCard = trackRef.current.children[0] as HTMLElement;

      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 12;
      const count = Math.floor((viewportWidth + gap) / (cardWidth + gap));

      setVisibleCount(Math.max(1, count));
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [products]);

  // Оновлюємо maxIndex
  useEffect(() => {
    const newMaxIndex = Math.max(0, products.length - visibleCount);
    setMaxIndex(newMaxIndex);
    if (onMaxIndexChange) {
      onMaxIndexChange(newMaxIndex);
    }
  }, [visibleCount, products.length, onMaxIndexChange]);

  // Обмежуємо currentIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      onSlide(maxIndex);
    }
  }, [currentIndex, maxIndex, onSlide]);

  const getTranslateX = () => {
    if (!trackRef.current) return 0;

    const firstCard = trackRef.current.children[0] as HTMLElement;
    if (!firstCard) return 0;

    const cardWidth = firstCard.offsetWidth;
    const gap = 12;

    const safeIndex = Math.min(currentIndex, maxIndex);

    return -(safeIndex * (cardWidth + gap));
  };

  return (
    <div className="new-models">
      <div className="new-models__container">
        <div className="new-models__slider">
          <div className="new-models__viewport" ref={viewportRef}>
            <div
              className="new-models__track"
              ref={trackRef}
              style={{
                transform: `translateX(${getTranslateX()}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {products.map(product => (
                <ProductCart
                  key={product.id}
                  product={product}
                  isDiscounted={isDiscounted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
