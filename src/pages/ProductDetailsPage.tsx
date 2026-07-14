//# region Imports

import '../styles/ProductDetailsPage.scss';
import heartIcon from '../../public/img/icons/Favourites (Heart Like).png';
import backArrow from '../../public/img/icons/arrowRight.png';
import heartIconFilled from '../../public/img/icons/heartIconFilled.png';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchProductById';
import { ColorMap } from '../utils/colorMap';

import { Phone } from '../types/phone';
import { Tablet } from '../types/tablet';
import { Accessory } from '../types/accessorie';
import { CartItem } from '../types/cartItem';

import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { getRandomProducts } from '../utils/getRandomProducts';
import { AddToFavorites } from '../utils/AddToFavorite';
import { AddToCart } from '../utils/AddToCart';
import { fetchProducts } from '../utils/fetchProducts';

import { NavButton } from '../components/NavButton/NavButton';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { Product } from '../types/product';

import { useState, useEffect } from 'react';

//#endregion

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Phone | Tablet | Accessory>();
  const [activeImage, setActiveImage] = useState(product?.images[0]);
  const [activeColor, setActiveColor] = useState(product?.color);
  const [activeCapacity, setActiveCapacity] = useState(product?.capacity);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [offers, setOffers] = useState<Product[]>([]);
  const [offersIndex, setOffersIndex] = useState(0);
  const [offersMaxIndex, setOffersMaxIndex] = useState(0);
  const [catalogProduct, setCatalogProduct] = useState<Product>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const slideOffersNext = () => {
    if (offersIndex < offersMaxIndex) {
      setOffersIndex(prev => prev + 1);
    }
  };

  const slideOffersPrev = () => {
    if (offersIndex > 0) {
      setOffersIndex(prev => prev - 1);
    }
  };

  const loadProduct = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      //видалити на фіналі
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // throw new Error('Test error');
      const getProduct = fetchProductById(productId || '');

      setProduct(getProduct);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }

    const productFromCatalog = fetchProducts().find(
      p => p.itemId === productId,
    );

    setCatalogProduct(productFromCatalog);
  };

  const handleToggleCart = () => {
    if (!catalogProduct) {
      return;
    }

    const result = AddToCart(catalogProduct);

    setIsInCart(result.inCart);
  };

  const handleToggleFavorite = () => {
    if (!catalogProduct) {
      return;
    }

    const result = AddToFavorites(catalogProduct);

    setIsFavorite(result.isActive);
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (product && productId) {
      setActiveImage(product.images[0]);
      setActiveColor(product.color);
      setActiveCapacity(product.capacity);
      const randomProducts = getRandomProducts(productId);

      setOffers(randomProducts);
    }
  }, [product]);

  useEffect(() => {
    if (!catalogProduct) {
      return;
    }

    const stored = localStorage.getItem('favorites');
    const favorites: Product[] = stored ? JSON.parse(stored) : [];

    setIsFavorite(favorites.some(item => item.id === catalogProduct.id));
  }, [catalogProduct]);

  useEffect(() => {
    if (!catalogProduct) {
      return;
    }

    const stored = localStorage.getItem('cart');

    if (stored) {
      const cartItems: CartItem[] = JSON.parse(stored);
      const exists = cartItems.some(
        item => item.product.id === catalogProduct.id,
      );

      setIsInCart(exists);
    }
  }, [catalogProduct]);

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  if (isError) {
    return <ErrorPage reload={loadProduct} />;
  }

  return (
    <div className="product-details">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-details__container">
          <Breadcrumbs category={product.category} productName={product.name} />

          <div className="product-details__back">
            <div className="product-details__icon">
              <img
                className="product-details__arrow"
                src={backArrow}
                alt="Back icon"
              />
            </div>
            <Link
              to={`/${product.category}`}
              className="product-details__back-link"
            >
              <span className="product-details__link-text">Back</span>
            </Link>
          </div>

          <h1 className="product-details__name">{product.name}</h1>

          <div className="product-details__information">
            <div className="product-details__gallery">
              <div className="product-details__main">
                <img
                  className="product-details__image-main"
                  src={activeImage}
                  alt={product.name}
                />
              </div>

              <div className="product-details__viewport">
                <div className="product-details__images">
                  {product.images.map((img, index) => (
                    <img
                      onClick={() => setActiveImage(img)}
                      key={index}
                      className={`product-details__images-item ${
                        img === activeImage
                          ? 'product-details__images-item--active'
                          : ''
                      }`}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="product-details__options">
              <div className="product-details__colors">
                <div className="product-details__colors-header">
                  <span>Available colors</span>
                  <span>ID: {product.id}</span>
                </div>
                <div className="product-details__colors-list">
                  {product.colorsAvailable.map((color, index) => (
                    <label
                      aria-label={`Color ${color}`}
                      onClick={() => setActiveColor(color)}
                      key={index}
                      className={`product-details__colors-label ${
                        color === activeColor
                          ? 'product-details__colors-label--active'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        defaultChecked={color === product.color}
                        className="product-details__colors-radio"
                      />
                      <span
                        className="product-details__colors-item"
                        style={{
                          backgroundColor: ColorMap[color] || '#cccccc',
                        }}
                      />
                    </label>
                  ))}
                </div>
                <div className="product-details__divider" />
              </div>

              <div className="product-details__capacity">
                <span className="product-details__capacity-label">
                  Select capacity
                </span>
                <div className="product-details__capacity-options">
                  {product.capacityAvailable.map((c, index) => (
                    <label
                      key={index}
                      onClick={() => setActiveCapacity(c)}
                      className={`product-details__capacity-label-wrapper ${
                        c === activeCapacity
                          ? 'product-details__capacity-label-wrapper--active'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="capacity"
                        value={c}
                        className="product-details__capacity-radio"
                        defaultChecked={c === product.capacity}
                      />
                      <span
                        className={`product-details__capacity-option ${
                          c === activeCapacity
                            ? 'product-details__capacity-option--active'
                            : ''
                        }`}
                      >
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="product-details__divider" />
              </div>

              <div className="product-details__price">
                <span className="product-details__price-current">
                  ${product.priceDiscount}
                </span>
                <span className="product-details__price-full">
                  ${product.priceRegular}
                </span>
              </div>

              <div className="product-details__buttons">
                <button
                  onClick={handleToggleCart}
                  className={`product-details__buttons-add ${isInCart ? 'product-details__buttons-add product-details__buttons--incart' : ''}`}
                >
                  {isInCart ? 'Added' : 'Add to cart'}
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className="product-details__buttons-heart"
                >
                  {isFavorite ? (
                    <img
                      src={heartIconFilled}
                      alt="heart"
                      className="product-cart__button--heart-icon"
                    />
                  ) : (
                    <img
                      src={heartIcon}
                      alt="heart"
                      className="product-cart__button--heart-icon"
                    />
                  )}
                </button>
              </div>

              <div className="product-details__params">
                <div className="product-details__param">
                  <span className="product-details__param-title">Screen</span>
                  <span className="product-details__param-value">
                    {product.screen}
                  </span>
                </div>
                <div className="product-details__param">
                  <span className="product-details__param-title">
                    Resolution
                  </span>
                  <span className="product-details__param-value">
                    {product.resolution}
                  </span>
                </div>
                <div className="product-details__param">
                  <span className="product-details__param-title">
                    Processor
                  </span>
                  <span className="product-details__param-value">
                    {product.processor}
                  </span>
                </div>
                <div className="product-details__param">
                  <span className="product-details__param-title">RAM</span>
                  <span className="product-details__param-value">
                    {product.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__info-all">
            <div className="product-details__about">
              <h2 className="product-details__about-title">About</h2>
              <div className="product-details__divider" />

              {product.description.map((desc, index) => (
                <div key={index} className="product-details__description">
                  <h3 className="product-details__description-title">
                    {desc.title}
                  </h3>
                  {desc.text.map((paragraph, i) => (
                    <p key={i} className="product-details__description-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="product-details__techs">
              <h2 className="product-details__techs-title">Tech specs</h2>
              <div className="product-details__divider" />

              <div className="product-details__tech">
                <span className="product-details__tech-title">Screen</span>
                <span className="product-details__tech-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details__tech">
                <span className="product-details__tech-title">Resolution</span>
                <span className="product-details__tech-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__tech">
                <span className="product-details__tech-title">Processor</span>
                <span className="product-details__tech-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details__tech">
                <span className="product-details__tech-title">RAM</span>
                <span className="product-details__tech-value">
                  {product.ram}
                </span>
              </div>

              {'camera' in product && (
                <div className="product-details__tech">
                  <span className="product-details__tech-title">Camera</span>
                  <span className="product-details__tech-value">
                    {product.camera}
                  </span>
                </div>
              )}

              {'zoom' in product && (
                <div className="product-details__tech">
                  <span className="product-details__tech-title">Zoom</span>
                  <span className="product-details__tech-value">
                    {product.zoom}
                  </span>
                </div>
              )}

              <div className="product-details__tech">
                <span className="product-details__tech-title">Cell</span>
                <span className="product-details__tech-value">
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>

            <div className="product-details__divider" />
          </div>

          <div className="product-details__offers">
            <div className="product-details__offers-title">
              <h2 className="product-details__about-title">
                You may also like
              </h2>
            </div>
            <div className="product-details__nav">
              <NavButton
                direction="left"
                disabled={offersIndex === 0}
                onClick={slideOffersPrev}
              />
              <NavButton
                direction="right"
                disabled={offersIndex >= offersMaxIndex}
                onClick={slideOffersNext}
              />
            </div>
          </div>
          <ProductSlider
            FilterredProducts={offers}
            isDiscounted={true}
            currentIndex={offersIndex}
            onSlide={setOffersIndex}
            onMaxIndexChange={setOffersMaxIndex}
          />
        </div>
      )}
    </div>
  );
};
