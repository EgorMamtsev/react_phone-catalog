import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
// import { Header } from './pages/Header/Header';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);
