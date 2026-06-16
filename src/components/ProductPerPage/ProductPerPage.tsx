import arrowDown from '../../../public/img/icons/ArrowDown.png';
import '../ProductPerPage/ProductPerPage.scss';
type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  postPerPage: number | 'All';
  setPostPerPage: (value: number | 'All') => void;
  setCurrentPage: (value: number) => void;
};

export const ProductsPerPage = ({
  isOpen,
  setIsOpen,
  postPerPage,
  setPostPerPage,
  setCurrentPage,
}: Props) => {
  const handleSelectOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="products-per-page__filter">
      <span className="products-per-page__filter-text">Items on page</span>
      <div className="products-per-page__select">
        <div className="products-per-page__trigger" onClick={handleSelectOpen}>
          <span className="products-per-page__trigger-text">{postPerPage}</span>
          <div className="products-per-page__trigger-arrow">
            <img src={arrowDown} alt="Arrow Down" />
          </div>
        </div>
        {isOpen && (
          <div className="products-per-page__options">
            <div
              className="products-per-page__option"
              onClick={() => {
                setPostPerPage(4);
                setIsOpen(false);
                setCurrentPage(1);
              }}
            >
              4
            </div>
            <div
              className="products-per-page__option"
              onClick={() => {
                setPostPerPage(8);
                setIsOpen(false);
                setCurrentPage(1);
              }}
            >
              8
            </div>
            <div
              className="products-per-page__option"
              onClick={() => {
                setPostPerPage(16);
                setIsOpen(false);
                setCurrentPage(1);
              }}
            >
              16
            </div>
            <div
              className="products-per-page__option"
              onClick={() => {
                setPostPerPage('All');
                setIsOpen(false);
                setCurrentPage(1);
              }}
            >
              All
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
