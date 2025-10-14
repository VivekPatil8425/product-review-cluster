import React from 'react';
import { TrendingUp, Users, AlertCircle } from 'lucide-react';

interface ClusterStatsProps {
  metrics: {
    num_clusters: number;
    noise_points: number;
    total_reviews: number;
  };
}

const ClusterStats: React.FC<ClusterStatsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Clusters</p>
            <p className="text-3xl font-bold text-gray-100 mt-2">{metrics.num_clusters}</p>
          </div>
          <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-green-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Reviews</p>
            <p className="text-3xl font-bold text-gray-100 mt-2">{metrics.total_reviews}</p>
          </div>
          <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-orange-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Noise Points</p>
            <p className="text-3xl font-bold text-gray-100 mt-2">{metrics.noise_points}</p>
          </div>
          <div className="bg-orange-500 bg-opacity-20 p-3 rounded-lg">
            <AlertCircle className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterStats;
