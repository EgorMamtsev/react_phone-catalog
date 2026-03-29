import { Slider } from '../components/Slider/Slider';

import '../styles/HomePage.scss';

export const HomePage = () => {
  return (
    <main className="home-page">
      <div className="home-page__container">
        <div className="home-page__title-block">
          <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
      <Slider />
    </main>
  );
};
