import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => (
  <>
    <Header></Header>

    <div className="App">
      <Outlet />
    </div>

    <Footer></Footer>
  </>
);
