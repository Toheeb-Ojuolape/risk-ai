import requests
import json
from fastapi import HTTPException
import os

GEMINI_API_URL = os.getenv('GEMINI_API_URL')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')


def get_gemini_summary(asset, weather):
    try:
        url = f"{GEMINI_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = json.dumps(
            {
                'contents': [
                    {
                        'parts': [
                            {
                                'text': f"Write a qualitative and quantitative report about the risk asssessments of an asset with details: {asset} and weather data: {weather}."
                            }
                        ]
                    }
                ]
            }
        )
        headers = {'Content-Type': 'application/json'}
        response = requests.request('POST', url, headers=headers, data=payload)
        response.raise_for_status()  # Raise an error for HTTP issues
        response_data = response.json()
        candidates = response_data.get('candidates', [])
        if candidates and 'content' in candidates[0]:
            parts = candidates[0]['content'].get('parts', [])
            if parts:
                return parts[0].get('text', 'AI not responsive')
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while generating report from Gemini: {e}"
        )
