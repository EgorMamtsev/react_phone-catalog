import './App.scss';
import { Footer } from './pages/Footer';
import { Header } from './pages/Header';

export const App = () => (
  <>
    <Header></Header>

    <div className="App">
      <h1>Product Catalog</h1>
    </div>

    <Footer></Footer>
  </>
);
