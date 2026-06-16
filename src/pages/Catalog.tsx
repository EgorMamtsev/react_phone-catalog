//#region Imports
import HomeIcon from '../../public/img/icons/HomeIcon.png';
import arrowRight from '../../public/img/icons/arrowRight.png';

import '../styles/Catalog.scss';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProducts } from '../utils/fetchProducts';

import { ProductCart } from '../components/ProductCart/ProductCart';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductsSort } from '../components/ProductSort/ProductSort';
import { ProductsPerPage } from '../components/ProductPerPage/ProductPerPage';
import { NavButton } from '../components/NavButton/NavButton';

import { Product } from '../types/product';

//#endregion

export const Catalog = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { category: categoryName } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState<number | 'All'>(4);

  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isItemPerPageOpen, setIsItemPerPageOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState('Newest');
  const [sortOption, setSortOption] = useState('year');

  useEffect(() => {
    const products = fetchProducts();

    setAllProducts(products);
  }, []);

  useEffect(() => {
    setSortOption('year');
    setSelectedOption('Newest');
    setCurrentPage(1);
  }, [categoryName]);

  const filteredProducts = allProducts.filter(product => {
    return product.category === categoryName;
  });

  const getSortedProducts = (productsToSort: Product[], sortBy: string) => {
    const sorted = [...productsToSort];

    switch (sortBy) {
      case 'year':
        return sorted.sort((a, b) => b.year - a.year);
      case 'price-asc':
        return sorted.sort((a, b) => a.fullPrice - b.fullPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.fullPrice - a.fullPrice);
      default:
        return sorted;
    }
  };

  const totalProducts = useMemo(() => {
    return getSortedProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  const lastPostIndex =
    postPerPage === 'All'
      ? totalProducts.length
      : currentPage * Number(postPerPage);
  const firstPostIndex =
    postPerPage === 'All' ? 0 : lastPostIndex - Number(postPerPage);

  const sortedProducts = useMemo(() => {
    return totalProducts.slice(firstPostIndex, lastPostIndex);
  }, [totalProducts, firstPostIndex, lastPostIndex]);

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
          <span className="catalog__category">{categoryName}</span>
        </div>

        <div className="catalog__title">
          <span className="catalog__title-text">{getTitle(categoryName)}</span>
          <span className="catalog__title-number">
            {filteredProducts.length} models
          </span>
        </div>

        <div className="catalog__filters">
          <ProductsSort
            isOpen={isSortByOpen}
            setIsOpen={setIsSortByOpen}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          <ProductsPerPage
            isOpen={isItemPerPageOpen}
            setIsOpen={setIsItemPerPageOpen}
            postPerPage={postPerPage}
            setPostPerPage={setPostPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="catalog__products">
          {sortedProducts.map(product => (
            <ProductCart
              key={product.id}
              product={product}
              isDiscounted={false}
            />
          ))}
        </div>
        <div className="catalog__paggination">
          <NavButton
            direction={'left'}
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          />
          <Pagination
            totalPosts={totalProducts.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
          <NavButton direction={'right'} disabled={false} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
