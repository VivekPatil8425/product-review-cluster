import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Brain, BarChart3, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">
            Customer Review Clustering
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Analyze product reviews using advanced machine learning techniques.
            Discover patterns, sentiment trends, and meaningful clusters in customer feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 hover:border-blue-500 transition-all">
            <div className="bg-blue-500 bg-opacity-20 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">DBSCAN Clustering</h3>
            <p className="text-gray-400">
              Group similar reviews together using density-based clustering to identify patterns and themes.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 hover:border-green-500 transition-all">
            <div className="bg-green-500 bg-opacity-20 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Sentiment Analysis</h3>
            <p className="text-gray-400">
              Classify reviews as positive, neutral, or negative using VADER sentiment analysis.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 hover:border-orange-500 transition-all">
            <div className="bg-orange-500 bg-opacity-20 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Visual Insights</h3>
            <p className="text-gray-400">
              Interactive charts and visualizations to explore clustering results and sentiment distribution.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:shadow-xl"
          >
            Start Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-16 bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-100 mb-1">Fetch Product Reviews</h3>
                <p className="text-gray-400">Load product reviews from DummyJSON API</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-100 mb-1">Run ML Analysis</h3>
                <p className="text-gray-400">Apply DBSCAN clustering and VADER sentiment analysis</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-100 mb-1">Explore Results</h3>
                <p className="text-gray-400">View interactive visualizations and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
