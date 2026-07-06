import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductCart } from '../components/ProductCart/ProductCart';
import '../styles/Favorites.scss';
import { Product } from '../types/product';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const getFavorites = () => {
    const fav = localStorage.getItem('favorites');

    if (!fav) {
      return;
    }

    const parsed = JSON.parse(fav);

    setFavorites(parsed);
  };

  const handleToggleFavorite = (product: Product) => {
    const exists = favorites.some(p => p.id === product.id);
    let updated: Product[];

    if (exists) {
      updated = favorites.filter(p => p.id !== product.id); // ← видаляємо
    } else {
      updated = [...favorites, product]; // ← додаємо
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites">
      <div className="favorites__container">
        <Breadcrumbs category={'Favorites'} />

        <h1 className="favorites__title">Favorites</h1>
        <span className="favorites__count">{`${favorites.length} items`}</span>

        <div className="favorites__items">
          {favorites.map(item => (
            <ProductCart
              key={item.id}
              product={item}
              isDiscounted={true}
              onToggleFavorite={() => handleToggleFavorite(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
