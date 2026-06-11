import HomeIcon from '../../public/img/icons/HomeIcon.png';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProducts } from '../utils/fetchProducts';

import { ProductCart } from '../components/ProductCart/ProductCart';

import { Product } from '../types/product';

type Props = {};

export const Catalog = ({}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { category } = useParams();

  useEffect(() => {
    const allProducts = fetchProducts();

    setProducts(allProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    return product.category === category;
  });

  return (
    <div className="catalog__container">
      <div className="catalog__nav">
        <img
          className="catalog-img catalog__home-icon "
          src={HomeIcon}
          alt="Home"
        />
        <span>{category}</span>
      </div>

      <div className="catalog__title">
        <span className="catalog__title-text">Вид товару</span>
        <span className="catalog__title-number">кількість товару</span>
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
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
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
  );
};
