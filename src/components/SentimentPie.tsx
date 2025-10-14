import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SentimentPieProps {
  sentimentSummary: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const COLORS = {
  positive: '#10b981',
  neutral: '#f59e0b',
  negative: '#ef4444',
};

const SentimentPie: React.FC<SentimentPieProps> = ({ sentimentSummary }) => {
  const data = [
    { name: 'Positive', value: sentimentSummary.positive, color: COLORS.positive },
    { name: 'Neutral', value: sentimentSummary.neutral, color: COLORS.neutral },
    { name: 'Negative', value: sentimentSummary.negative, color: COLORS.negative },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Legend
            wrapperStyle={{ color: '#f3f4f6' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPie;
