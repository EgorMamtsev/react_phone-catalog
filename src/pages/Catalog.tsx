import HomeIcon from '../../public/img/icons/HomeIcon.png';

import { Phone } from '../types/phone';

type Props = {
  productsType: Phone[];
};

export const Catalog = ({}: Props) => {
  return (
    <div className="catalog__container">
      <div className="catalog__nav">
        <img
          className="catalog-img catalog__home-icon "
          src={HomeIcon}
          alt="Home"
        />
      </div>

      <div className="catalog__title">
        <span className="catalog__title-text">Вид товару</span>
        <span className="catalog__title-number">кількість товару</span>
      </div>

      <div className="catalog__filters">
        <div className="catalog__filter">
          <span className="catalog__filter-text">Sort by</span>
          <select className="catalog__filter-select">
            <option value="0">shooce your option</option>
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

      <div className="catalog__products"></div>
    </div>
  );
};
