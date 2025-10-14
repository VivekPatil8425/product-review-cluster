import axios from 'axios';

const DUMMYJSON_BASE = 'https://dummyjson.com';
const BACKEND_BASE = 'http://localhost:8000';
const CUSTOM_PRODUCTS_URL = 'https://dummyjson.com/products';

export interface DummyJSONReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: DummyJSONReview[];
}

// Interface for your custom product data
export interface CustomProduct {
  id: number;
  sku: string;
  name: string;
  price: number;
  stock: number;
  review: {
    rating: number;
    text: string;
  };
  tags: string[];
}

export interface Review {
  product: string;
  reviewer: string;
  rating: number;
  comment: string;
}

export interface AnalysisResult {
  clusters: number[];
  sentiments: Array<{
    label: string;
    scores: {
      pos: number;
      neu: number;
      neg: number;
      compound: number;
    };
  }>;
  metrics: {
    num_clusters: number;
    noise_points: number;
    total_reviews: number;
  };
  sentiment_summary: {
    positive: number;
    neutral: number;
    negative: number;
  };
  cluster_summary: Array<{
    cluster: number;
    count: number;
    avg_sentiment: string;
    sentiment_distribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
  }>;
  visual_data: {
    pca: Array<{
      x: number;
      y: number;
      cluster: number;
      sentiment: string;
      product: string;
      comment: string;
    }>;
  };
}

// Fetch products from DummyJSON
export const fetchProducts = async (): Promise<DummyJSONProduct[]> => {
  try {
    const response = await axios.get(`${CUSTOM_PRODUCTS_URL}?limit=10`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<DummyJSONProduct> => {
  try {
    const response = await axios.get(`${DUMMYJSON_BASE}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const analyzeReviews = async (reviews: Review[], eps: number = 0.5, minSamples: number = 2): Promise<AnalysisResult> => {
  try {
    const response = await axios.post(`${BACKEND_BASE}/analyze`, {
      reviews,
      eps,
      min_samples: minSamples
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing reviews:', error);
    throw error;
  }
};

// Extract reviews from DummyJSON product structure
export const extractReviewsFromProducts = (products: DummyJSONProduct[]): Review[] => {
  const reviews: Review[] = [];

  products.forEach(product => {
    if (product.reviews && product.reviews.length > 0) {
      product.reviews.forEach(review => {
        reviews.push({
          product: product.title,
          reviewer: review.reviewerName,
          rating: review.rating,
          comment: review.comment
        });
      });
    }
  });

  return reviews;
};