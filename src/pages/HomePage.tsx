//#region imports
import '../styles/HomePage.scss';
import { fetchProducts } from '../utils/fetchProducts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Slider } from '../components/Slider/Slider';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { NavButton } from '../components/NavButton/NavButton';
import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';

import { Product } from '../types/product';

import categoryPhones from '../../public/img/category-phones.webp';
import categoryTablets from '../../public/img/category-tablets.webp';
import categoryAccessories from '../../public/img/category-accessories.webp';
//#endregion

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newModelsIndex, setNewModelsIndex] = useState(0);
  const [hotPricesIndex, setHotPricesIndex] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState<string | null>(null);

  const hotPricesProducts = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA; // сортування за спаданням (найбільша знижка першою)
    });

  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);

  const loadProducts = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      //видалити на фіналі
      await new Promise(resolve => setTimeout(resolve, 1000));
      // throw new Error('Test error');

      const allProducts = fetchProducts();

      const countsModels = {
        phones: 0,
        tablets: 0,
        accessories: 0,
      };

      for (const p of allProducts) {
        switch (p.category) {
          case 'phones':
            countsModels.phones++;
            break;
          case 'tablets':
            countsModels.tablets++;
            break;
          case 'accessories':
            countsModels.accessories++;
            break;
        }
      }

      setNumberOfProducts(countsModels);
      setProducts(allProducts);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  //#region Функції для навігації слайдерів
  // Функції для Brand new models
  const slideNewModelsNext = () => {
    if (newModelsIndex < brandNewProducts.length - 1) {
      setNewModelsIndex(newModelsIndex + 1);
    }
  };

  const slideNewModelsPrev = () => {
    if (newModelsIndex > 0) {
      setNewModelsIndex(newModelsIndex - 1);
    }
  };

  // Функції для Hot Prices
  const slideHotPricesNext = () => {
    if (hotPricesIndex < hotPricesProducts.length - 1) {
      setHotPricesIndex(hotPricesIndex + 1);
    }
  };

  const slideHotPricesPrev = () => {
    if (hotPricesIndex > 0) {
      setHotPricesIndex(hotPricesIndex - 1);
    }
  };

  //#endregion

  if (isError) {
    return <ErrorPage reload={loadProducts} />;
  }

  return (
    <main className="home-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="home-page__container">
            <div className="home-page__title-block">
              <h1 className="home-page__title visually-hidden">
                Welcome to Nice Gadgets store!
              </h1>
            </div>
          </div>

          <Slider />

          <div className="home-page__container">
            <div className="home-page__title-block">
              <h1 className="home-page__title">Brand new models</h1>
              <div className="home-page__nav">
                <NavButton
                  direction="left"
                  disabled={newModelsIndex === 0}
                  onClick={slideNewModelsPrev}
                />
                <NavButton
                  direction="right"
                  disabled={newModelsIndex >= brandNewProducts.length - 4}
                  onClick={slideNewModelsNext}
                />
              </div>
            </div>

            <ProductSlider
              FilterredProducts={brandNewProducts}
              currentIndex={newModelsIndex}
              onSlide={setNewModelsIndex}
              isDiscounted={false}
            />

            <div className="home-page__title-block">
              <h1 className="home-page__title">Shop by category</h1>
            </div>
            <div className="home-page__categories">
              <Link to={'/phones'}>
                <div className="home-page__category">
                  <div className="home-page__category-icon">
                    <img
                      className="home-page__category-icon-img"
                      src={categoryPhones}
                      alt="phone"
                    />
                  </div>
                  <div className="home-page__category-description">
                    <div className="home-page__category-name">
                      Mobile phones
                    </div>
                    <div className="home-page__category-number">
                      {numberOfProducts.phones} models
                    </div>
                  </div>
                </div>
              </Link>
              <Link to={'/tablets'}>
                <div className="home-page__category">
                  <div className="home-page__category-icon">
                    <img
                      className="home-page__category-icon-img"
                      src={categoryTablets}
                      alt=""
                    />
                  </div>
                  <div className="home-page__category-description">
                    <div className="home-page__category-name">Tablets</div>
                    <div className="home-page__category-number">
                      {numberOfProducts.tablets} models
                    </div>
                  </div>
                </div>
              </Link>
              <Link to={'/accessories'}>
                <div className="home-page__category">
                  <div className="home-page__category-icon">
                    <img
                      className="home-page__category-icon-img"
                      src={categoryAccessories}
                      alt=""
                    />
                  </div>
                  <div className="home-page__category-description">
                    <div className="home-page__category-name">Accessories</div>
                    <div className="home-page__category-number">
                      {numberOfProducts.accessories} models
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="home-page__title-block">
              <h1 className="home-page__title">Hot Prices</h1>
              <div className="home-page__nav">
                <NavButton
                  direction="left"
                  disabled={hotPricesIndex === 0}
                  onClick={slideHotPricesPrev}
                />
                <NavButton
                  direction="right"
                  disabled={hotPricesIndex >= brandNewProducts.length - 4}
                  onClick={slideHotPricesNext}
                />
              </div>
            </div>

            <ProductSlider
              FilterredProducts={hotPricesProducts}
              currentIndex={hotPricesIndex}
              onSlide={setHotPricesIndex}
              isDiscounted={true}
            />
          </div>
        </>
      )}
    </main>
  );
};
