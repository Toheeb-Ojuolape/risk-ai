from firebase_admin import firestore
from fastapi.responses import JSONResponse
from utils.get_weather_data import get_weather_data
from utils.get_news_data import get_news_data
from utils.get_gemini_summary import get_gemini_summary
import json

db = firestore.client()


def generate_report_controller(request, id):
    try:
        # first fetch the details of the asset with the id
        asset = db.collection('assets').document(id).get().to_dict()
        print(asset)

        # then pass the key data from the asset to the Gemini, News API and Weather services
        # get the weather data of the location

        # weather_data = get_weather_data(asset['longitude'], asset['latitude'])
        # print(weather_data) 

        news_data = get_news_data(f"tsunami in {asset['country']}")

        summary_data = get_gemini_summary(asset)

        # filter results further to ensure the title contains the natural catastrophe and the country

        # calculate the asset's risk number against a benchmark
        return {'message': 'Report generated successfully', 
                #'weather': json.loads(weather_data)
                "news": news_data,
                "summary": json.loads(summary_data)
                }

    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )
