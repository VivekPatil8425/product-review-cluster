import React from 'react';
import { Brain, TrendingUp, Github, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">About This Project</h1>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-3">
              <Brain className="w-7 h-7 text-blue-400" />
              DBSCAN Clustering
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-gray-100">DBSCAN</strong> (Density-Based Spatial Clustering of Applications with Noise)
                is a powerful clustering algorithm that groups together reviews with similar content while identifying outliers as noise.
              </p>
              <p>
                Unlike K-means clustering, DBSCAN doesn't require you to specify the number of clusters beforehand.
                It automatically discovers clusters based on density and can identify noise points that don't fit into any cluster.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <p className="font-semibold text-gray-100 mb-2">Key Parameters:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>eps:</strong> Maximum distance between two points to be considered neighbors</li>
                  <li><strong>min_samples:</strong> Minimum number of points required to form a dense region</li>
                </ul>
              </div>
              <p>
                In this application, reviews are converted to numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency),
                which captures the importance of words in each review relative to all reviews.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-green-400" />
              VADER Sentiment Analysis
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-gray-100">VADER</strong> (Valence Aware Dictionary and sEntiment Reasoner)
                is a lexicon and rule-based sentiment analysis tool specifically designed for social media text.
              </p>
              <p>
                VADER is particularly effective for analyzing product reviews because it:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understands sentiment intensity (not just polarity)</li>
                <li>Handles emoticons, slang, and informal language</li>
                <li>Accounts for capitalization and punctuation for emphasis</li>
                <li>Recognizes negation and degree modifiers</li>
              </ul>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <p className="font-semibold text-gray-100 mb-2">Classification:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong className="text-green-400">Positive:</strong> Compound score ≥ 0.05</li>
                  <li><strong className="text-yellow-400">Neutral:</strong> -0.05 &lt; compound score &lt; 0.05</li>
                  <li><strong className="text-red-400">Negative:</strong> Compound score ≤ -0.05</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-100 mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>React + TypeScript</li>
                  <li>Vite</li>
                  <li>Tailwind CSS</li>
                  <li>Recharts</li>
                  <li>React Router DOM</li>
                  <li>Axios</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100 mb-3">Backend</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Python</li>
                  <li>FastAPI</li>
                  <li>Scikit-learn (DBSCAN, TF-IDF)</li>
                  <li>VADER Sentiment</li>
                  <li>NumPy</li>
                  <li>PCA for visualization</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Data Source</h2>
            <p className="text-gray-300 mb-4">
              Product reviews are fetched from the <strong className="text-gray-100">DummyJSON API</strong>,
              a free fake REST API for testing and prototyping.
            </p>
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Visit DummyJSON <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-3">
              <Github className="w-7 h-7 text-gray-100" />
              Source Code
            </h2>
            <p className="text-gray-300 mb-4">
              This project is open source and available on GitHub. Feel free to explore the code,
              contribute, or use it as a reference for your own projects.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-8 shadow-lg border border-blue-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Use Cases</h2>
            <ul className="space-y-3 text-gray-200">
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Identify common themes and patterns in customer feedback</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Discover product issues by analyzing negative sentiment clusters</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Track sentiment trends across different product categories</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Automate review categorization for large e-commerce platforms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Prioritize customer support based on sentiment and cluster analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
