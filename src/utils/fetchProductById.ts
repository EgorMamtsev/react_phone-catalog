import { fetchPhones } from './fetchPhones';
import { fetchTablets } from './fetchTablets';
import { fetchAccessories } from './fetchAccessories';
import { fetchProducts } from './fetchProducts';

export function fetchProductById(productId: string) {
  const allProducts = fetchProducts();
  const productInfo = allProducts.find(p => p.itemId === productId);

  if (!productInfo) {
    return;
  }

  switch (productInfo.category) {
    case 'phones':
      return fetchPhones().find(p => p.id === productId);
    case 'tablets':
      return fetchTablets().find(p => p.id === productId);
    case 'accessories':
      return fetchAccessories().find(p => p.id === productId);
    default:
      return undefined;
  }
}
