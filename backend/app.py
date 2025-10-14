from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import re

app = FastAPI(title="Customer Review Clustering API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Review(BaseModel):
    product: str
    reviewer: str
    rating: float
    comment: str

class AnalyzeRequest(BaseModel):
    reviews: List[Review]
    eps: float = 0.5
    min_samples: int = 2

def preprocess_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def analyze_sentiment(text: str, analyzer: SentimentIntensityAnalyzer) -> Dict[str, Any]:
    scores = analyzer.polarity_scores(text)
    if scores['compound'] >= 0.05:
        label = 'positive'
    elif scores['compound'] <= -0.05:
        label = 'negative'
    else:
        label = 'neutral'
    return {
        'label': label,
        'scores': scores
    }

@app.get("/")
def read_root():
    return {"message": "Customer Review Clustering API", "status": "running"}

@app.post("/analyze")
def analyze_reviews(request: AnalyzeRequest):
    try:
        if len(request.reviews) < 2:
            raise HTTPException(status_code=400, detail="Need at least 2 reviews for clustering")

        comments = [review.comment for review in request.reviews]
        preprocessed = [preprocess_text(comment) for comment in comments]

        vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
        X = vectorizer.fit_transform(preprocessed).toarray()

        dbscan = DBSCAN(eps=request.eps, min_samples=request.min_samples, metric='cosine')
        clusters = dbscan.fit_predict(X)

        analyzer = SentimentIntensityAnalyzer()
        sentiments = [analyze_sentiment(comment, analyzer) for comment in comments]

        sentiment_counts = {'positive': 0, 'neutral': 0, 'negative': 0}
        for sent in sentiments:
            sentiment_counts[sent['label']] += 1

        total = len(sentiments)
        sentiment_summary = {
            'positive': round((sentiment_counts['positive'] / total) * 100, 1),
            'neutral': round((sentiment_counts['neutral'] / total) * 100, 1),
            'negative': round((sentiment_counts['negative'] / total) * 100, 1)
        }

        unique_clusters = set(clusters)
        num_clusters = len([c for c in unique_clusters if c != -1])
        noise_points = list(clusters).count(-1)

        cluster_summary = []
        for cluster_id in sorted(unique_clusters):
            cluster_reviews = [(i, sentiments[i]) for i, c in enumerate(clusters) if c == cluster_id]
            if len(cluster_reviews) > 0:
                cluster_sentiments = [s['label'] for _, s in cluster_reviews]
                sentiment_dist = {
                    'positive': cluster_sentiments.count('positive'),
                    'neutral': cluster_sentiments.count('neutral'),
                    'negative': cluster_sentiments.count('negative')
                }
                avg_sentiment = max(sentiment_dist, key=sentiment_dist.get)

                cluster_summary.append({
                    'cluster': int(cluster_id),
                    'count': len(cluster_reviews),
                    'avg_sentiment': avg_sentiment,
                    'sentiment_distribution': sentiment_dist
                })

        pca = PCA(n_components=2)
        X_pca = pca.fit_transform(X)

        visual_data = {
            'pca': [
                {
                    'x': float(X_pca[i, 0]),
                    'y': float(X_pca[i, 1]),
                    'cluster': int(clusters[i]),
                    'sentiment': sentiments[i]['label'],
                    'product': request.reviews[i].product,
                    'comment': request.reviews[i].comment[:50] + '...'
                }
                for i in range(len(X_pca))
            ]
        }

        return {
            'clusters': clusters.tolist(),
            'sentiments': sentiments,
            'metrics': {
                'num_clusters': num_clusters,
                'noise_points': noise_points,
                'total_reviews': total
            },
            'sentiment_summary': sentiment_summary,
            'cluster_summary': cluster_summary,
            'visual_data': visual_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
