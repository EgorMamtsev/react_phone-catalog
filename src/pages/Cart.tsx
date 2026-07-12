import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import '../styles/Cart.scss';
import { Link } from 'react-router-dom';

import CloseIcon from '../../public/img/icons/Close.png';
import backArrow from '../../public/img/icons/arrowRight.png';

export const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storred = localStorage.getItem('cart');

    if (storred) {
      const inCart = JSON.parse(storred);

      setCart(inCart);
    }
  }, []);

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="product-details__back">
          <div className="product-details__icon">
            <img
              className="product-details__arrow"
              src={backArrow}
              alt="Back icon"
            />
          </div>
          <Link to={`/`} className="product-details__back-link">
            <span className="product-details__link-text">Back</span>
          </Link>
        </div>
        <div className="cart__title">
          <h1 className="cart__title-text">Cart</h1>
        </div>
        <div className="cart__wrapper">
          <div className="cart__items">
            {cart.map(item => (
              <div className="cart__item" key={item.id}>
                <div className="cart__info">
                  <div className="cart__remove-btn">
                    <button className="cart__remove">
                      <img
                        className="cart__close-icon"
                        src={CloseIcon}
                        alt="x"
                      />
                    </button>
                  </div>
                  <div className="cart__item-picture">
                    <img className="cart__image" src={item.image} alt="" />
                  </div>
                  <div className="cart__item-name">
                    <span className="cart__name">{item.name}</span>
                  </div>
                </div>
                <div className="cart__actions">
                  <div className="cart__product-count">
                    <button className="cart__decrease cart__button">-</button>
                    <div className="cart__number-of-product">1</div>
                    <button className="cart__increase cart__button">+</button>
                  </div>
                  <div className="cart__items-prise">${item.fullPrice}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart__total">
            <div className="cart__price">$2000</div>
            <div className="cart__items-count">
              <div className="cart__count">total for 3 items</div>
            </div>
            <div className="cart__separator"></div>
            <div className="cart__order-btn">
              <button className="cart__order">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
