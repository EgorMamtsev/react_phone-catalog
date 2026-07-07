import { Product } from '../types/product';

export const AddToCart = (product: Product) => {
  const storred = localStorage.getItem('cart');
  let cart: Product[] = storred ? JSON.parse(storred) : [];

  const exists = cart.some(p => p.id === product.id);

  if (exists) {
    cart = cart.filter(p => p.id !== product.id);
  } else {
    cart = [...cart, product];
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));

  return { cart };
};
