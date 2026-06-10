import './ProductCart.scss';
import heartIcon from '../../../public/img/icons/Favourites (Heart Like).png';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  isDiscounted: boolean;
};

export const ProductCart = ({ product, isDiscounted }: Props) => {
  return (
    <div className="product-cart">
      <div className="product-cart__image--container">
        <img
          className="product-cart__img"
          src={product.image}
          alt="product image"
        />
      </div>

      <div className="product-cart__name">{product.name}</div>
      {isDiscounted ? (
        <div className="product-cart__price">
          <span className="product-cart__price--current">${product.price}</span>
          <span className="product-cart__price--full">
            ${product.fullPrice}
          </span>
        </div>
      ) : (
        <div className="product-cart__price">
          {/* <span className="product-cart__price--current">${product.price}</span> */}
          <span className="product-cart__price--current">${product.price}</span>
        </div>
      )}
      {/* <div className="product-cart__price">
        <span className="product-cart__price--current">${product.price}</span>
        <span className="product-cart__price--full">${product.fullPrice}</span>
      </div> */}

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
        <button className="product-cart__button product-cart__button--like">
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
