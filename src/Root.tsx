import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<Catalog />} />
      </Route>
    </Routes>
  </Router>
);
