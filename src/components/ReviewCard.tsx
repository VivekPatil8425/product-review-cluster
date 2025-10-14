import React from 'react';
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
  product: string;
  reviewer: string;
  rating: number;
  comment: string;
  sentiment?: string;
  cluster?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  product,
  reviewer,
  rating,
  comment,
  sentiment,
  cluster,
}) => {
  const getSentimentColor = (sent?: string) => {
    if (!sent) return 'text-gray-400';
    switch (sent.toLowerCase()) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      case 'neutral':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700 hover:border-gray-600 transition-all hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-100">{product}</h4>
          <div className="flex items-center gap-2 mt-1">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400">{reviewer}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-100 font-semibold">{rating}</span>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-3">{comment}</p>

      <div className="flex items-center gap-4 pt-3 border-t border-gray-700">
        {sentiment && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sentiment:</span>
            <span className={`text-sm font-medium ${getSentimentColor(sentiment)} capitalize`}>
              {sentiment}
            </span>
          </div>
        )}
        {cluster !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Cluster:</span>
            <span className="text-sm font-medium text-blue-400">
              {cluster === -1 ? 'Noise' : cluster}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
