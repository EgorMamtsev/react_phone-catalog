import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductCart } from '../components/ProductCart/ProductCart';
import '../styles/Favorites.scss';
import { Product } from '../types/product';

import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const getFavorites = () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const fav = localStorage.getItem('favorites');

      if (!fav) {
        return;
      }

      const parsed = JSON.parse(fav);

      setFavorites(parsed);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (product: Product) => {
    const exists = favorites.some(p => p.id === product.id);
    let updated: Product[];

    if (exists) {
      updated = favorites.filter(p => p.id !== product.id); // ← видаляємо
    } else {
      updated = [...favorites, product];
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (isError) {
    return <ErrorPage reload={getFavorites} />;
  }

  return (
    <div className="favorites">
      {isLoading ? (
        <Loader />
      ) : (
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
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
