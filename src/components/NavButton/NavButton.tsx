import DefaultButton from '../../../public/img/icons/SliderBtnDefault.png';
import HoverButton from '../../../public/img/icons/SliderBtnHover.png';
import DisabledButton from '../../../public/img/icons/SliderBtnDisabled.png';
import './NavButton.scss';
import { useState } from 'react';

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
};

export const NavButton = ({ direction, disabled, onClick }: Props) => {
  const [isHover, setIsHovered] = useState(false);

  const getIgon = () => {
    if (disabled) {
      return DisabledButton;
    }

    if (isHover) {
      return HoverButton;
    }

    return DefaultButton;
  };

  return (
    <button
      className={`nav-button nav-button--${direction}`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={getIgon()} alt={`${direction}`} className="nav-button__icon" />
    </button>
  );
};
