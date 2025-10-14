import React from 'react';
import { Star, MessageSquare, Tag } from 'lucide-react';
import { DummyJSONProduct } from '../api/reviewApi';

interface ProductCardProps {
  product: DummyJSONProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-100 flex-1">{product.title}</h3>
        <span className="text-xl font-bold text-blue-400">${product.price}</span>
      </div>

      <p className="text-sm text-gray-400 mb-2">Category: {product.category}</p>
      <p className="text-sm text-gray-500 mb-4">{product.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-300">{product.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400">{product.reviews?.length || 0} reviews</span>
        </div>

        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3 text-gray-500" />
          <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;