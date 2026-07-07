import { useEffect, useState } from 'react';
import { Product } from '../types/product';

export const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storred = localStorage.getItem('cart');

    if (storred) {
      const inCart = JSON.parse(storred);

      setCart(inCart);
    }
  });

  return (
    <div className="cart">
      <div className="cart__container">
        ``
        <div className="cart__title">
          <h1 className="cart__title-text">Cart</h1>
        </div>
        <div className="cart__items">
          {cart.map(item => (
            <div className="cart__item" key={item.id}>
              <div className="cart__remove-btn">
                <button className="cart__remove">x</button>
              </div>
              <div className="cart__item-picture">
                <img className="cart__image" src={item.image} alt="" />
              </div>
              <div className="cart__item-name">
                <span className="cart__name">{item.name}</span>
              </div>
              <div className="cart__product-count">
                <button className="cart__decrease">-</button>
                <div className="cart__number-of-product">1</div>
                <button className="cart__increase">+</button>
              </div>
              <div className="cart__items-prise">{item.fullPrice}</div>
            </div>
          ))}
        </div>
        <div className="cart__total">
          <div className="cart__price">price</div>
          <div className="cart__items-count">
            <div className="cart__count">items count</div>
          </div>
          <div className="cart__separator">-----</div>
          <div className="cart__order-btn">
            <button className="cart__button">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
