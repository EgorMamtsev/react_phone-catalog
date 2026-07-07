import './ProductCart.scss';
import { Product } from '../../types/product';
import { AddToFavorites } from '../../utils/AddToFavorite';

import heartIcon from '../../../public/img/icons/Favourites (Heart Like).png';
import heartIconFilled from '../../../public/img/icons/heartIconFilled.png';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  product: Product;
  isDiscounted: boolean;
  onToggleFavorite?: (product: Product) => void;
};

export const ProductCart = ({
  product,
  isDiscounted,
  onToggleFavorite,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      const favorites: Product[] = JSON.parse(stored);
      const exists = favorites.some(p => p.id === product.id);

      setIsActive(exists);
    }
  }, [product.id]);

  const handleToggle = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product);
      return;
    }

    const result = AddToFavorites(product);
    setIsActive(result.isActive);
  };

  return (
    <div className="product-cart">
      <Link
        to={`/product/${product.itemId}`}
        className="product-cart__image--container"
      >
        <img
          className="product-cart__img"
          src={product.image}
          alt="product image"
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className="product-cart__name">
        {product.name}
      </Link>
      {isDiscounted ? (
        <div className="product-cart__price">
          <span className="product-cart__price--current">${product.price}</span>
          <span className="product-cart__price--full">
            ${product.fullPrice}
          </span>
        </div>
      ) : (
        <div className="product-cart__price">
          <span className="product-cart__price--current">${product.price}</span>
        </div>
      )}

      <span className="product-cart__separator"></span>

      <div className="product-cart__specs">
        <div className="product-cart__spec">
          <div className="product-cart__spec-title">Screen</div>
          <div className="product-cart__spec-value">{product.screen}</div>
        </div>
        <div className="product-cart__spec">
          <div className="product-cart__spec-title">Capacity</div>
          <div className="product-cart__spec-value">{product.capacity}</div>
        </div>
        <div className="product-cart__spec">
          <div className="product-cart__spec-title">RAM</div>
          <div className="product-cart__spec-value">{product.ram}</div>
        </div>
      </div>

      <div className="product-cart__actions">
        <button className="product-cart__button product-cart__button--add">
          Add to cart
        </button>
        <button
          onClick={handleToggle}
          className="product-cart__button product-cart__button--like"
        >
          {isActive ? (
            <img
              src={heartIconFilled}
              alt="heart"
              className="product-cart__button--heart-icon"
            />
          ) : (
            <img
              src={heartIcon}
              alt="heart"
              className="product-cart__button--heart-icon"
            />
          )}
        </button>
      </div>
    </div>
  );
};
