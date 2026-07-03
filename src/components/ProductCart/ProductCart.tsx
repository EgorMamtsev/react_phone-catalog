import './ProductCart.scss';
import { Product } from '../../types/product';

import heartIcon from '../../../public/img/icons/Favourites (Heart Like).png';
import { Link } from 'react-router-dom';

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
  const handleToggle = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product);

      return;
    }

    const stored = localStorage.getItem('favorites');
    let favorites: Product[] = stored ? JSON.parse(stored) : [];

    const exists = favorites.some(p => p.id === product.id);

    if (exists) {
      favorites = favorites.filter(p => p.id !== product.id);
    } else {
      favorites = [...favorites, product];
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
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
          <img
            src={heartIcon}
            alt="heart"
            className="product-cart__button--heart-icon"
          />
        </button>
      </div>
    </div>
  );
};
