import requests
import os
from fastapi import HTTPException


OPENWEATHER_API_URL = os.getenv('OPENWEATHER_API_URL')
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
WEATHER_API_URL = os.getenv('WEATHER_API_URL')
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')


def get_weather_data(longitude, latitude):
    try:
        url = f"{OPENWEATHER_API_URL}/data/2.5/weather?lat={latitude}&lon={longitude}&appid={OPENWEATHER_API_KEY}"

        response = requests.request('GET', url)
        return response.text

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while fetching weather data: {e}"
        )


def get_weather_forecast(city):
    try:
        url = f"{WEATHER_API_URL}/v1/forecast.json?key=50c0ce4ead2a46f6b98100656251301&q=${city}&days=4&aqi=yes&alerts=no"

        response = requests.request('GET', url)
        return response.text

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while fetching weather data: {e}"
        )
