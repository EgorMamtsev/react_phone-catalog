import homeIcon from '../../../public/img/icons/HomeIcon.png';
import arrowRight from '../../../public/img/icons/arrowRight.png';
import { Link } from 'react-router-dom';
import './Breadcrumps.scss';

type Props = {
  category?: string;
  productName?: string;
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const Breadcrumbs = ({ category, productName }: Props) => {
  return (
    <div className="breadcrumbs">
      <Link to={'/'}>
        <img className="breadcrumbs__home" src={homeIcon} alt="home" />
        <img className="breadcrumbs__arrow" src={arrowRight} alt=">" />
      </Link>

      {category && (
        <>
          <Link
            to={`/${category}`}
            className={` breadcrumbs__link ${productName ? '' : 'breadcrumbs__link--active'}`}
          >
            {capitalize(category)}
          </Link>
        </>
      )}

      {productName && (
        <>
          <img className="breadcrumbs__arrow" src={arrowRight} alt=">" />
          <span className="breadcrumbs__link breadcrumbs__link--active">
            {capitalize(productName)}
          </span>
        </>
      )}
    </div>
  );
};
