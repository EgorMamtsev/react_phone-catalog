import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/cartItem';
import { updateCartQuantity } from '../utils/updateCartQuntity';
import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import CloseIcon from '../../public/img/icons/Close.png';
import backArrow from '../../public/img/icons/arrowRight.png';
import styles from '../styles/Cart.module.scss';

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const loadPage = () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const stored = localStorage.getItem('cart');

      if (stored) {
        const inCart = JSON.parse(stored);

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
    <div className={styles.cart}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.cart__container}>
          <div className={styles.cart__back}>
            <div className={styles.cart__icon}>
              <img
                className={styles.cart__arrow}
                src={backArrow}
                alt="Back icon"
              />
            </div>
            <Link to="/" className={styles.cart__backLink}>
              <span className={styles.cart__linkText}>Back</span>
            </Link>
          </div>

          <div className={styles.cart__title}>
            <h1 className={styles.cart__titleText}>Cart</h1>
          </div>

          <div className={styles.cart__wrapper}>
            <div className={styles.cart__items}>
              {cart.map(item => (
                <div className={styles.cart__item} key={item.product.id}>
                  <div className={styles.cart__info}>
                    <div className={styles.cart__removeBtn}>
                      <button
                        onClick={() => removeFromCart(item)}
                        className={styles.cart__remove}
                      >
                        <img
                          className={styles.cart__closeIcon}
                          src={CloseIcon}
                          alt="x"
                        />
                      </button>
                    </div>
                    <Link
                      to={`/product/${item.product.itemId}`}
                      className={styles.cart__itemPicture}
                    >
                      <img
                        className={styles.cart__image}
                        src={item.product.image}
                        alt=""
                      />
                    </Link>
                    <Link
                      to={`/product/${item.product.itemId}`}
                      className={styles.cart__itemName}
                    >
                      <span className={styles.cart__name}>
                        {item.product.name}
                      </span>
                    </Link>
                  </div>

                  <div className={styles.cart__actions}>
                    <div className={styles.cart__productCount}>
                      <button
                        onClick={() => decreaseCount(item.product.id)}
                        className={`${styles.cart__button} ${styles.cart__decrease}`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <div className={styles.cart__numberOfProduct}>
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => increaseCount(item.product.id)}
                        className={`${styles.cart__button} ${styles.cart__increase}`}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.cart__itemsPrice}>
                      ${item.product.fullPrice * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cart__total}>
              <div className={styles.cart__price}>${getTotalPrice()}</div>
              <div className={styles.cart__itemsCount}>
                <div className={styles.cart__count}>
                  Total for {cart.length} items
                </div>
              </div>
              <div className={styles.cart__separator}></div>
              <div className={styles.cart__orderBtn}>
                <button className={styles.cart__order}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
