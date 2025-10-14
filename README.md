# Customer Review Clustering for eCommerce

A professional dark-themed web application that analyzes product reviews using machine learning. The app fetches reviews from DummyJSON API, performs clustering using DBSCAN, analyzes sentiment using VADER, and visualizes results with interactive charts.

## Features

- **DBSCAN Clustering**: Groups similar reviews together using density-based clustering
- **VADER Sentiment Analysis**: Classifies reviews as positive, neutral, or negative
- **Interactive Visualizations**: Pie charts, bar charts, and PCA scatter plots
- **Real-time Analysis**: Fetch and analyze product reviews on demand
- **Dark Theme**: Beautiful, modern UI with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- React Router DOM
- Axios

### Backend
- Python 3.9+
- FastAPI
- Scikit-learn (DBSCAN, TF-IDF, PCA)
- VaderSentiment
- NumPy

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- pip

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python app.py
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. **Start Backend**: Make sure the Python backend is running on `http://localhost:8000`
2. **Start Frontend**: Run the React development server
3. **Navigate**: Open your browser to the frontend URL
4. **Fetch Products**: Go to the Products page to load reviews from DummyJSON
5. **Run Analysis**: Click "Run Clustering & Sentiment Analysis" button
6. **View Results**: Explore the Analysis page with interactive charts and statistics

## API Endpoints

### Backend API

- `GET /` - Health check
- `POST /analyze` - Analyze reviews with DBSCAN and VADER
  - Request body:
    ```json
    {
      "reviews": [
        {
          "product": "Product Name",
          "reviewer": "John Doe",
          "rating": 5,
          "comment": "Great product!"
        }
      ],
      "eps": 0.5,
      "min_samples": 2
    }
    ```

### External API

- DummyJSON API: `https://dummyjson.com/products?limit=10`

## Project Structure

```
customer-review-clustering/
├── backend/
│   ├── app.py                 # FastAPI application
│   └── requirements.txt       # Python dependencies
├── src/
│   ├── api/
│   │   └── reviewApi.ts      # API integration layer
│   ├── components/
│   │   ├── ClusterBarChart.tsx
│   │   ├── ClusterStats.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ScatterPlot.tsx
│   │   └── SentimentPie.tsx
│   ├── context/
│   │   └── ReviewContext.tsx # Global state management
│   ├── pages/
│   │   ├── About.tsx         # Algorithm explanations
│   │   ├── Analysis.tsx      # Results visualization
│   │   ├── Home.tsx          # Landing page
│   │   └── Products.tsx      # Review fetching
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Tailwind styles
├── package.json
└── README.md
```

## How It Works

### 1. Data Collection
- Fetches product reviews from DummyJSON API
- Extracts review text, ratings, and metadata

### 2. Text Preprocessing
- Converts text to lowercase
- Removes punctuation and special characters
- Tokenizes and normalizes text

### 3. Feature Extraction
- Uses TF-IDF (Term Frequency-Inverse Document Frequency)
- Converts text into numerical vectors
- Captures importance of words relative to corpus

### 4. DBSCAN Clustering
- Groups similar reviews based on content
- Automatically determines number of clusters
- Identifies outliers as noise points
- Parameters:
  - `eps`: Maximum distance between neighbors (default: 0.5)
  - `min_samples`: Minimum points to form cluster (default: 2)

### 5. Sentiment Analysis
- Uses VADER lexicon-based approach
- Generates compound sentiment score
- Classifies as positive, neutral, or negative
- Handles emojis, slang, and emphasis

### 6. Visualization
- PCA reduces dimensions to 2D for scatter plot
- Interactive charts show cluster distribution
- Color-coded sentiment visualization

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable for backend URL if needed

### Backend (Render/Railway)

1. Create new Python web service
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `python backend/app.py`
5. Configure environment variables if needed

## Configuration

### DBSCAN Parameters

Adjust clustering sensitivity in the analysis request:
- **eps**: Lower values = tighter clusters (try 0.3-0.7)
- **min_samples**: Higher values = more strict clustering (try 2-5)

### Backend URL

Update the backend URL in `src/api/reviewApi.ts` if deploying to production:
```typescript
const BACKEND_BASE = 'https://your-backend-url.com';
```

## Troubleshooting

### Backend Connection Error
- Ensure Python backend is running on port 8000
- Check CORS is enabled in FastAPI
- Verify backend URL in frontend code

### No Reviews Found
- Check DummyJSON API is accessible
- Verify network connection
- Check browser console for errors

### Clustering Issues
- Minimum 2 reviews required for clustering
- Try adjusting eps and min_samples parameters
- Check that reviews have text content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [DummyJSON](https://dummyjson.com) for the fake API
- [VADER Sentiment](https://github.com/cjhutto/vaderSentiment) for sentiment analysis
- [Scikit-learn](https://scikit-learn.org) for machine learning algorithms
- [Recharts](https://recharts.org) for data visualization
