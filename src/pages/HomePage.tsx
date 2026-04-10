import { Slider } from '../components/Slider/Slider';
import '../styles/HomePage.scss';
import { NewModels } from '../components/NewModels/NewModels';
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../utils/fetchProducts';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newModelsIndex, setNewModelsIndex] = useState(0);
  const [hotPricesIndex, setHotPricesIndex] = useState(0);

  useEffect(() => {
    const allProducts = fetchProducts();

    setProducts(allProducts);
  }, []);

  const slideNewModelsNext = () => {
    if (newModelsIndex < products.length - 1) {
      setNewModelsIndex(newModelsIndex + 1);
    }
  };

  const slideNewModelsPrev = () => {
    if (newModelsIndex > 0) {
      setNewModelsIndex(newModelsIndex - 1);
    }
  };

  const slideHotPricesNext = () => {
    if (hotPricesIndex < products.length - 1) {
      setHotPricesIndex(hotPricesIndex + 1);
    }
  };

  const slideHotPricesPrev = () => {
    if (hotPricesIndex > 0) {
      setHotPricesIndex(hotPricesIndex - 1);
    }
  };

  return (
    <main className="home-page">
      <div className="home-page__container">
        <div className="home-page__title-block">
          <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
        </div>
      </div>

      <Slider />

      <div className="home-page__container">
        <div className="home-page__title-block">
          <h1 className="home-page__title">Brand new models</h1>
          <div className="home-page__nav">
            <button
              onClick={slideNewModelsPrev}
              className="home-page__nav-button home-page__nav-button--prev"
            />
            <button
              onClick={slideNewModelsNext}
              className="home-page__nav-button home-page__nav-button--next"
            />
          </div>
        </div>

        <NewModels
          products={products}
          currentIndex={newModelsIndex}
          onSlide={setNewModelsIndex}
        />

        <div className="home-page__title-block">
          <h1 className="home-page__title">Categories</h1>
        </div>

        <div className="home-page__title-block">
          <h1 className="home-page__title">Hot Prices</h1>
          <div className="home-page__nav">
            <button
              onClick={slideHotPricesPrev}
              className="home-page__nav-button home-page__nav-button--prev"
            />
            <button
              onClick={slideHotPricesNext}
              className="home-page__nav-button home-page__nav-button--next"
            />
          </div>
        </div>

        <NewModels
          products={products}
          currentIndex={hotPricesIndex}
          onSlide={setHotPricesIndex}
        />
      </div>
    </main>
  );
};
