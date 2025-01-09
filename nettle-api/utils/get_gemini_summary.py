import requests
import json
from fastapi import HTTPException
import os

GEMINI_API_URL = os.getenv('GEMINI_API_URL')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')


def get_gemini_summary(asset):
    try:
        url = f"{GEMINI_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = json.dumps(
            {
                'contents': [
                    {
                        'parts': [
                            {
                                'text': f"Write a qualitative and quantitative report about the risk asssessments of an {asset['title']} located in {asset['country']} at latitude {asset['latitude']} and longitude {asset['longitude']}."
                            }
                        ]
                    }
                ]
            }
        )
        headers = {'Content-Type': 'application/json'}
        response = requests.request('POST', url, headers=headers, data=payload)
        return response.text
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while generating report from Gemini: {e}"
        )
