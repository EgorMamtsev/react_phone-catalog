import logo from '../../../public/img/Logo.png';
import backToTopbtn from '../../../public/img/icons/back to top btn.png';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img className="footer__logo-image" src={logo} alt="" />
        </div>

        <div className="footer__info">
          <a className="footer__info-link" href="">
            GITHUB
          </a>
          <a className="footer__info-link" href="">
            CONTACTS
          </a>
          <a className="footer__info-link" href="">
            RIGHTS
          </a>
        </div>

        <div className="footer__back">
          <span className="footer__back-label">Back to top</span>
          <button className="footer__back-button">
            <img className="footer__back-image" src={backToTopbtn} alt="" />
          </button>
        </div>
      </div>
    </footer>
  );
};
