# 🛍️ Customer Review Clustering for eCommerce

This project is my journey in building a tool to understand customer comments.  
It uses a **FastAPI backend** and a **React (Vite) frontend**.

It automatically takes raw comments, groups them into themes (using **DBSCAN**), and checks for good or bad feelings (using **VADER**).

---

## 🤔 Why I Built This

Reading every customer comment one by one is slow. It's hard to see the big patterns.

I wanted to build a tool that quickly finds:

- What do customers love?  
- What parts are broken or need fixing?  
- What problems keep happening?

I chose **DBSCAN** because it's great at finding related groups and also finds "noise" (comments that don't fit any group).

---

## 💻 Tech I Used

**Backend:** FastAPI, scikit-learn, VADER  
**Frontend:** React (with Vite), react-plotly.js  
**Data Source:** DummyJSON API

---

## ✨ What It Does

### 🧩 Backend (FastAPI)

- Has an API endpoint (`/analyze`) that you send settings to.  
- It grabs comments from the DummyJSON API.  
- It cleans the text and turns it into numbers using **TF-IDF** (with 1-word and 2-word phrases).  
- It groups the comments using **DBSCAN**.  
- It finds the feeling (Positive, Neutral, Negative) for each comment using **VADER**.  
- It sends back a summary for each group (top words, sample comments, feeling scores).

### 💻 Frontend (React)

- You can change settings like `eps`, `min_samples`, and how many comments to get.  
- It shows charts (made with **Plotly**) of the feelings for all comments and for each group.  
- You can see the top words and sample comments for each group.

---

## 🧠 My Key Decisions and Learnings

### Why DummyJSON?
It was a simple, stable API for getting "real-looking" fake comments. This let me test my app fast.

### Why TF-IDF with (1, 2) n-grams?
Using both single words and two-word phrases (like "battery life") made my groups much clearer. Using `stop_words` helped ignore common words.

### Why DBSCAN over K-Means?
DBSCAN was better for this job. It can find groups of any shape and automatically labels "noise" or "outliers".  
This is perfect for messy review text.  
I learned that changing `eps` and `min_samples` is key to finding good topics.

### Why VADER?
It was a fast and simple way to get sentiment scores without needing a big, complex model.

### Handling CORS was a big lesson!
At first, my React app couldn't talk to my FastAPI backend. I learned to fix this in two ways:

- **For development:** Use the Vite proxy. This was the easiest way.  
- **For production:** Set up `CORSMiddleware` in FastAPI to allow my exact frontend web address.

---
