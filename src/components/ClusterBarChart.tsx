import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ClusterBarChartProps {
  clusterSummary: Array<{
    cluster: number;
    count: number;
    avg_sentiment: string;
    sentiment_distribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
  }>;
}

const ClusterBarChart: React.FC<ClusterBarChartProps> = ({ clusterSummary }) => {
  const data = clusterSummary.map(item => ({
    name: item.cluster === -1 ? 'Noise' : `Cluster ${item.cluster}`,
    count: item.count,
    positive: item.sentiment_distribution.positive,
    neutral: item.sentiment_distribution.neutral,
    negative: item.sentiment_distribution.negative,
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Reviews per Cluster</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Legend wrapperStyle={{ color: '#f3f4f6' }} />
          <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
          <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral" />
          <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClusterBarChart;
