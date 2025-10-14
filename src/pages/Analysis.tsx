import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useReviewContext } from '../context/ReviewContext';
import { analyzeReviews } from '../api/reviewApi';
import ClusterStats from '../components/ClusterStats';
import SentimentPie from '../components/SentimentPie';
import ClusterBarChart from '../components/ClusterBarChart';
import ScatterPlot from '../components/ScatterPlot';
import ReviewCard from '../components/ReviewCard';

const Analysis: React.FC = () => {
  const { reviews, analysisResult, setAnalysisResult, isLoading, setIsLoading, error, setError } = useReviewContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews.length === 0) {
      navigate('/products');
      return;
    }

    if (!analysisResult) {
      runAnalysis();
    }
  }, []);

  const runAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await analyzeReviews(reviews, 0.5, 2);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze reviews. Make sure the backend server is running on http://localhost:8000');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Analyzing reviews with DBSCAN and VADER...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={runAnalysis}
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 mb-2">Analysis Results</h1>
            <p className="text-gray-400">
              Clustering and sentiment analysis complete
            </p>
          </div>
          <button
            onClick={runAnalysis}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Re-analyze
          </button>
        </div>

        <div className="space-y-8">
          <ClusterStats metrics={analysisResult.metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SentimentPie sentimentSummary={analysisResult.sentiment_summary} />
            <ClusterBarChart clusterSummary={analysisResult.cluster_summary} />
          </div>

          <ScatterPlot visualData={analysisResult.visual_data.pca} />

          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Classified Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  product={review.product}
                  reviewer={review.reviewer}
                  rating={review.rating}
                  comment={review.comment}
                  sentiment={analysisResult.sentiments[index].label}
                  cluster={analysisResult.clusters[index]}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Cluster Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-gray-400 font-medium">Cluster</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Reviews</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Avg Sentiment</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Positive</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Neutral</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Negative</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult.cluster_summary.map((cluster) => (
                    <tr key={cluster.cluster} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4 text-gray-100 font-medium">
                        {cluster.cluster === -1 ? 'Noise' : `Cluster ${cluster.cluster}`}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{cluster.count}</td>
                      <td className="py-3 px-4">
                        <span className={`capitalize ${
                          cluster.avg_sentiment === 'positive' ? 'text-green-400' :
                          cluster.avg_sentiment === 'negative' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {cluster.avg_sentiment}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-green-400">{cluster.sentiment_distribution.positive}</td>
                      <td className="py-3 px-4 text-yellow-400">{cluster.sentiment_distribution.neutral}</td>
                      <td className="py-3 px-4 text-red-400">{cluster.sentiment_distribution.negative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
