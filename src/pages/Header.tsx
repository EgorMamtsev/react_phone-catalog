import '../styles/Header.scss';
import logo from '../../public/img/Logo.png';
import iconHeart from '../../public/img/icons/Favourites (Heart Like).png';
import iconBag from '../../public/img/icons/Shopping bag (Cart).png';
import iconBurger from '../../public/img/icons/Menu.png';
import iconClose from '../../public/img/icons/Close.png';

import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 100);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img className="header__logo-image" src={logo} />
        </div>

        <nav className="header__nav">
          <a className="header__nav-link">HOME</a>
          <a className="header__nav-link">PHONES</a>
          <a className="header__nav-link">TABLETS</a>
          <a className="header__nav-link">ACCESSORIES</a>
        </nav>

        <div className="header__actions">
          <a className="header__icon header__icon--favorite">
            <img className="header__icon-image" src={iconHeart} alt="" />
          </a>
          <a className="header__icon header__icon--bag">
            <img className="header__icon-image" src={iconBag} alt="" />
          </a>
          <button className="header__burger" onClick={toggleMenu}>
            {isMenuOpen ? (
              <img className="header__burger-image" src={iconClose} alt="" />
            ) : (
              <img className="header__burger-image" src={iconBurger} alt="" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`header__menu ${isClosing ? 'header__menu--closing' : ''}`}
          >
            <nav className="header__menu-nav">
              <a className="header__menu-link" href="#" onClick={closeMenu}>
                HOME
              </a>
              <a
                className="header__menu-link"
                href="#"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                PHONES
              </a>
              <a
                className="header__menu-link"
                href="#"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                TABLETS
              </a>
              <a
                className="header__menu-link"
                href="#"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ACCESSORIES
              </a>
            </nav>
            <div className="header__menu-actions">
              <a className="header__menu-icon header__menu-icon--favorite">
                <img className="header__menu-image" src={iconHeart} alt="" />
              </a>
              <a className="header__menu-icon header__menu-icon--bag">
                <img className="header__menu-image" src={iconBag} alt="" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
