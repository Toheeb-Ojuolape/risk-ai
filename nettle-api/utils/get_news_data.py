from gnews import GNews
from fastapi import HTTPException


def get_news_data(country):
    try:
        google_news = GNews(period='7d', start_date=None, end_date=None, max_results=10)
        country_news = google_news.get_news(country)
        return country_news
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error encountered while fetching news data: {e}")
