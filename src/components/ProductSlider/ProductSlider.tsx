import './ProductSlider.scss';
import { ProductCart } from '../ProductCart/ProductCart';
import { Product } from '../../types/product';
import { useRef, useState } from 'react';

type Props = {
  FilterredProducts: Product[];
  currentIndex: number;
  onSlide: (index: number) => void;
  isDiscounted: boolean;
};

export const ProductSlider = ({
  FilterredProducts: products,
  currentIndex,
  onSlide,
  isDiscounted,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getTranslateX = () => {
    if (!trackRef.current) {
      return 0;
    }

    const card = trackRef.current.children[0] as HTMLElement;
    const cardWidth = card ? card.offsetWidth : 212;
    const gap = 12;

    return -(currentIndex * (cardWidth + gap));
  };

  return (
    <div className="new-models">
      <div className="new-models__container">
        <div className="new-models__slider">
          <div
            className="new-models__viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
