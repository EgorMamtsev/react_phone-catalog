//#region Imports
import HomeIcon from '../../public/img/icons/HomeIcon.png';
import arrowRight from '../../public/img/icons/Chevron.png';

import '../styles/Catalog.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProducts } from '../utils/fetchProducts';

import { ProductCart } from '../components/ProductCart/ProductCart';

import { Product } from '../types/product';

//#endregion

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { category: categoryName } = useParams();

  useEffect(() => {
    const allProducts = fetchProducts();

    setProducts(allProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    return product.category === categoryName;
  });

  const getTitle = (category: string | undefined) => {
    switch (category) {
      case 'phones':
        return 'Mobile Phones';
        break;
      case 'tablets':
        return 'Tablets';
        break;
      case 'accessories':
        return 'Accessories';
        break;
      default:
        return 'Catalog';
    }
  };

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__path">
          <img
            className="catalog-img catalog__home-icon "
            src={HomeIcon}
            alt="Home"
          />
          <img
            src={arrowRight}
            alt="->"
            className="catalog-img catalog__arrow"
          />
          <span className="catalog__category">{category}</span>
        </div>

        <div className="catalog__title">
          <span className="catalog__title-text">{getTitle(category)}</span>
          <span className="catalog__title-number">
            {filteredProducts.length} models
          </span>
        </div>

        <div className="catalog__filters">
          <div className="catalog__filter">
            <span className="catalog__filter-text">Sort by</span>
            <select className="catalog__filter-select">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="catalog__filter">
            <span className="catalog__filter-text">Items on page</span>
            <select className="catalog__filter-select">
              <option className="catalog__filter-option" value="16">
                16
              </option>
              <option className="catalog__filter-option" value="32">
                24
              </option>
              <option className="catalog__filter-option" value="64">
                36
              </option>
            </select>
          </div>
        </div>

        <div className="catalog__products">
          {filteredProducts.map(product => (
            <ProductCart
              key={product.id}
              product={product}
              isDiscounted={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
