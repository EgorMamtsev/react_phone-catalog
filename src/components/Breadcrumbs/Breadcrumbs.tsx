import homeIcon from '../../../public/img/icons/HomeIcon.png';
import arrowRight from '../../../public/img/icons/arrowRight.png';
import { Link } from 'react-router-dom';
import './Breadcrumps.scss';

type Props = {
  category?: string;
  productName?: string;
};

export const Breadcrumbs = ({ category, productName }: Props) => {
  return (
    <div className="breadcrumbs">
      <img className="breadcrumbs__home" src={homeIcon} alt="home" />
      <img className="breadcrumbs__arrow" src={arrowRight} alt=">" />

      {category && (
        <>
          <Link
            to={`/${category}`}
            className={` breadcrumbs__link ${productName ? '' : 'breadcrumbs__link--active'}`}
          >
            {category}
          </Link>
        </>
      )}

      {productName && (
        <>
          <img className="breadcrumbs__arrow" src={arrowRight} alt=">" />
          <span className="breadcrumbs__link breadcrumbs__link--active">
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
