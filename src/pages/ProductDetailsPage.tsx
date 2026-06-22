import '../styles/ProductDetailsPage.scss';
import arrowRight from '../../public/img/icons/arrowRight.png';
import heartIcon from '../../public/img/icons/Favourites (Heart Like).png';

import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchProductById';

import HomeIcon from '../../public/img/icons/HomeIcon.png';

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = fetchProductById(productId || '');

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-details__container">
        <div className="product-details__breadcrumbs">
          <img src={HomeIcon} alt="home" />
          <img src={arrowRight} alt=">" />
          <span>{product.category}</span>
          <img src={arrowRight} alt=">" />
          <span>{product.name}</span>
        </div>

        <div className="product-details__name">{product.name}</div>

        <div className="product-details__information">
          <div className="product-details__galery">
            <div className="product-details__image">
              <img
                className="product-details__image image-main"
                src={product.images[0]}
                alt=""
              />
            </div>
            <div className="product-details__images">
              {product.images.map((img, index) => (
                <img className="product-details__img" key={index} src={img} />
              ))}
            </div>
          </div>

          <div className="product-details__options">
            <div className="product-details__colors">
              <div className="product-details__colors-availible">
                <span className="product-details__text">Availible colors</span>
                <span className="product-details__text">id:</span>
              </div>
              <div className="product-details__palitra">
                {product.colorsAvailable.map((color, index) => (
                  <div
                    key={index}
                    className="product-details__color"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="product-details__capacity">
              <span className="product-details__text">Select capacity</span>
              <div className="product-details__capacity-options">
                {product.capacityAvailable.map((c, index) => (
                  <div key={index} className="product-details__capacity-option">
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div className="product-details__prise">
              <div className="product-details__current">
                ${product.priceDiscount}
              </div>
              <div className="product-details__full">
                {product.priceRegular}
              </div>
            </div>
            <div className="product-details__buttons">
              <button
                className="product-details__button
               product-details__button--add"
              >
                Add to cart
              </button>
              <button
                className="product-details__button 
              product-details__button--heart"
              >
                <img
                  className="product-details__heart-icon"
                  src={heartIcon}
                  alt=""
                />
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
                <span className="product-details__param-title">Resolution</span>
                <span className="product-details__param-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__param">
                <span className="product-details__param-title">Processor</span>
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

        <div className="product-details__about">
          <div className="product-details__about-title">About</div>
          {product.description.map((desc, index) => (
            <div key={index} className="product-details__description">
              <div className="product-details__description-title ">
                {desc.title}
              </div>
              <div className="product-details__description-text">
                {desc.text}
              </div>
            </div>
          ))}
        </div>

        <div className="product-details__techs">
          <div className="product-details__tech-title">Tech specs</div>
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
            <span className="product-details__tech-title">Ram</span>
            <span className="product-details__tech-value">{product.ram}</span>
          </div>
          <div className="product-details__tech">
            <span className="product-details__tech-title">Built in memory</span>
            <span className="product-details__tech-value">
              *обране capasity*
            </span>
          </div>
          <div className="product-details__tech">
            <span className="product-details__tech-title">camera</span>
            <span className="product-details__tech-value">camera</span>
          </div>
          <div className="product-details__tech">
            <span className="product-details__tech-title">cell</span>
            <span className="product-details__tech-value">cell</span>
          </div>
        </div>

        <div className="product-details__offers">offers</div>
      </div>
    </div>
  );
};
