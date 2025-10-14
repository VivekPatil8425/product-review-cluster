import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Review, AnalysisResult, DummyJSONProduct } from '../api/reviewApi';

interface ReviewContextType {
  products: DummyJSONProduct[];
  setProducts: (products: DummyJSONProduct[]) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<DummyJSONProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ReviewContext.Provider
      value={{
        products,
        setProducts,
        reviews,
        setReviews,
        analysisResult,
        setAnalysisResult,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};