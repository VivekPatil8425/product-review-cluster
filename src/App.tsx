import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Package, BarChart3, Info } from 'lucide-react';
import { ReviewProvider } from './context/ReviewContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Analysis from './pages/Analysis';
import About from './pages/About';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-100 hover:text-blue-400 transition-colors">
            <BarChart3 className="w-6 h-6" />
            Review Clustering
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/products')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
              }`}
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </Link>
            <Link
              to="/analysis"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/analysis')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analysis</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <ReviewProvider>
        <div className="min-h-screen bg-gray-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </ReviewProvider>
    </Router>
  );
}

export default App;
