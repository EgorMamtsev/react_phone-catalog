import { Outlet } from 'react-router-dom';
import './App.scss';
// import { Footer } from './pages/Footer';
import { Header } from './pages/Header';

export const App = () => (
  <>
    <Header></Header>

    <div className="App">
      <Outlet />
    </div>

    {/* <Footer></Footer> */}
  </>
);
