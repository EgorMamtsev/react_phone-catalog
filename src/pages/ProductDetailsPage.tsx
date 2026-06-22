import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchProductById';

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = fetchProductById(productId || '');

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <div className="breadcrumbs">breadcrumbs</div>

        <div className="product-details__information">
          <div className="product-details__title title-main">
            {product.name}
          </div>
          <div className="product-details__images">
            {product.images.map((img, index) => (
              <img key={index} src={img} />
            ))}
          </div>
          <div className="carusel">img carusel</div>
          <div className="product-details__colors">
            <div className="product-details__title">
              <span className="product-details__text">Availible colors</span>
            </div>
            <div className="product-details__options">
              {product.colorsAvailable.map((color, index) => (
                <div key={index} className="product-details__option">
                  {color}
                </div>
              ))}
            </div>
          </div>
          <div className="product-details__capacity">
            <span className="product-details">Select capacity</span>
            <div className="product-details__capacity-options">
              {product.capacityAvailable.map((c, index) => (
                <div key={index} className="product-details__capacity-optin">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="product-details__prise">
            <div className="product-details__current-price">
              {product.priceDiscount}
            </div>
            <div className="product-details__full-price">
              {product.priceRegular}
            </div>
            <button className="product-details__add">Add to cart</button>
            <button className="product-details__heard">heart</button>
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
          <div className="product-details__about">
            <div className="product-details__about-title">About</div>
            {product.description.map((desc, index) => (
              <div key={index} className="product-details__description">
                <div className="product-details-title">{desc.title}</div>
                <div className="product-details-text">{desc.text}</div>
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
              <span className="product-details__tech-title">
                Built in memory
              </span>
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
    </div>
  );
};
