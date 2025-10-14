import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { useReviewContext } from '../context/ReviewContext';
import { fetchProducts, extractReviewsFromProducts } from '../api/reviewApi';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';

const Products: React.FC = () => {
  const { products, setProducts, reviews, setReviews, setIsLoading, isLoading, error, setError } = useReviewContext();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLocalLoading(true);
      setError(null);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      const extractedReviews = extractReviewsFromProducts(fetchedProducts);
      setReviews(extractedReviews);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleAnalyze = () => {
    if (reviews.length > 0) {
      navigate('/analysis');
    }
  };

  if (localLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading products and reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-400">{error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-100 mb-2">Product Reviews</h1>
              <p className="text-gray-400">
                Loaded {products.length} products with {reviews.length} reviews
              </p>
            </div>
            {reviews.length > 0 && (
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Run Clustering & Sentiment Analysis
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {products.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">All Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  product={review.product}
                  reviewer={review.reviewer}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
