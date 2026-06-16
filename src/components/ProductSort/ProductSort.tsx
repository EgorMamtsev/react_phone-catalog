import arrowDown from '../../../public/img/icons/ArrowDown.png';
import '../ProductSort/ProductSort.scss';
type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
};

export const ProductsSort = ({
  isOpen,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  setSortOption,
}: Props) => {
  const handleSelectOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="product-sort__filter">
      <span className="product-sort__filter-text">Sort by</span>
      <div className="product-sort__select">
        <div className="product-sort__trigger" onClick={handleSelectOpen}>
          <span className="product-sort__trigger-text">{selectedOption}</span>
          <div className="product-sort__trigger-arrow">
            <img src={arrowDown} alt="Arrow Down" />
          </div>
        </div>
        {isOpen && (
          <div className="product-sort__options">
            <div
              className="product-sort__option"
              onClick={() => {
                setSelectedOption('Newest');
                setIsOpen(false);
                setSortOption('year');
              }}
            >
              Newest
            </div>
            <div
              className="product-sort__option"
              onClick={() => {
                setSelectedOption('Price: Low to High');
                setIsOpen(false);
                setSortOption('price-asc');
              }}
            >
              Price: Low to High
            </div>
            <div
              className="product-sort__option"
              onClick={() => {
                setSelectedOption('Price: High to Low');
                setIsOpen(false);
                setSortOption('price-desc');
              }}
            >
              Price: High to Low
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
