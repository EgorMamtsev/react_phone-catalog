import './NewModels.scss';
import { ProductCart } from '../ProductCart/ProductCart';
import { Product } from '../../types/product';
import { useRef } from 'react';

type Props = {
  products: Product[];
  currentIndex: number;
  onSlide: (index: number) => void;
};

export const NewModels = ({ products, currentIndex, onSlide }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    if (currentIndex < products.length - 1) {
      onSlide(currentIndex + 1);
    }
  };

  const slidePrev = () => {
    if (currentIndex > 0) {
      onSlide(currentIndex - 1);
    }
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideNext();
      } else {
        slidePrev();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
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
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
