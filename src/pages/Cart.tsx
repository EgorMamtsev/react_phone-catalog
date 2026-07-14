import { useEffect, useState } from 'react';
import '../styles/Cart.scss';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/cartItem';
import { updateCartQuantity } from '../utils/updateCartQuntity';
import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';

import CloseIcon from '../../public/img/icons/Close.png';
import backArrow from '../../public/img/icons/arrowRight.png';

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const loadPage = () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const storred = localStorage.getItem('cart');

      if (storred) {
        const inCart = JSON.parse(storred);

        setCart(inCart);
      }
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const removeFromCart = (item: CartItem) => {
    const stored = localStorage.getItem('cart');

    if (!stored) {
      return;
    }

    const inCart: CartItem[] = JSON.parse(stored);

    const updatedCart = inCart.filter(p => p.product.id !== item.product.id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseCount = (productID: number) => {
    const result = updateCartQuantity(productID, 1);

    setCart(result.cart);
  };

  const decreaseCount = (productID: number) => {
    const result = updateCartQuantity(productID, -1);

    setCart(result.cart);
  };

  const getTotalPrice = () => {
    let total = 0;

    for (const item of cart) {
      total += item.product.fullPrice * item.quantity;
    }

    return total;
  };

  if (isError) {
    return <ErrorPage reload={loadPage} />;
  }

  return (
    <div className="cart">
      {isLoading ? (
        <Loader />
      ) : (
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
                <div className="cart__item" key={item.product.id}>
                  <div className="cart__info">
                    <div className="cart__remove-btn">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="cart__remove"
                      >
                        <img
                          className="cart__close-icon"
                          src={CloseIcon}
                          alt="x"
                        />
                      </button>
                    </div>
                    <Link
                      to={`/product/${item.product.itemId}`}
                      className="cart__item-picture"
                    >
                      <img
                        className="cart__image"
                        src={item.product.image}
                        alt=""
                      />
                    </Link>
                    <Link
                      to={`/product/${item.product.itemId}`}
                      className="cart__item-name"
                    >
                      <span className="cart__name">{item.product.name}</span>
                    </Link>
                  </div>
                  <div className="cart__actions">
                    <div className="cart__product-count">
                      <button
                        onClick={() => decreaseCount(item.product.id)}
                        className="cart__decrease cart__button"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <div className="cart__number-of-product">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => increaseCount(item.product.id)}
                        className="cart__increase cart__button"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart__items-prise">
                      $${item.product.fullPrice * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__total">
              <div className="cart__price">${getTotalPrice()}</div>
              <div className="cart__items-count">
                <div className="cart__count">Total for {cart.length} items</div>
              </div>
              <div className="cart__separator"></div>
              <div className="cart__order-btn">
                <button className="cart__order">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
