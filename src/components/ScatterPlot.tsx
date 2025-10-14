import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';

interface ScatterPlotProps {
  visualData: Array<{
    x: number;
    y: number;
    cluster: number;
    sentiment: string;
    product: string;
    comment: string;
  }>;
}

const CLUSTER_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
];

const ScatterPlot: React.FC<ScatterPlotProps> = ({ visualData }) => {
  const clusterGroups = visualData.reduce((acc, point) => {
    const clusterKey = point.cluster === -1 ? 'noise' : `cluster_${point.cluster}`;
    if (!acc[clusterKey]) {
      acc[clusterKey] = [];
    }
    acc[clusterKey].push(point);
    return acc;
  }, {} as Record<string, typeof visualData>);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Cluster Visualization (PCA)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" dataKey="x" name="PC1" stroke="#9ca3af" />
          <YAxis type="number" dataKey="y" name="PC2" stroke="#9ca3af" />
          <ZAxis range={[100, 100]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="font-semibold text-gray-100">
                      {data.cluster === -1 ? 'Noise Point' : `Cluster ${data.cluster}`}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">Product: {data.product}</p>
                    <p className="text-sm text-gray-300">Sentiment: {data.sentiment}</p>
                    <p className="text-sm text-gray-400 mt-1">{data.comment}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: '#f3f4f6' }} />
          {Object.entries(clusterGroups).map(([key, points], index) => {
            const clusterNum = key === 'noise' ? -1 : parseInt(key.split('_')[1]);
            const color = clusterNum === -1 ? '#6b7280' : CLUSTER_COLORS[clusterNum % CLUSTER_COLORS.length];
            const name = clusterNum === -1 ? 'Noise' : `Cluster ${clusterNum}`;

            return (
              <Scatter
                key={key}
                name={name}
                data={points}
                fill={color}
              />
            );
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;
