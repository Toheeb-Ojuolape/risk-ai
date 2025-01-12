from firebase_admin import firestore
from fastapi.responses import JSONResponse
from fastapi import Request
from utils.get_weather_data import get_weather_data
from utils.get_news_data import get_news_data
from utils.get_gemini_summary import get_gemini_summary
import json
from utils.calculate_risk_factor import calculate_risk_score
from models import Asset

db = firestore.client()


def generate_report_controller(request, id):
    try:
        query = request.url.query.split('&')

        # Create a customization setting using the request query parameters passed
        settings = {
            key: value.lower() == 'true'
            for key, value in (pair.split('=') for pair in query)
        }
        weather_data = None
        earthquake_data = None
        wildfire_data = None
        flood_data = None

        # fetch the details of the asset with the id
        asset: Asset = db.collection('assets').document(id).get().to_dict()

        if settings['weather']:
            weather_data = get_weather_data(asset['longitude'], asset['latitude'])

        if settings['earthquake']:
            earthquake_data = get_news_data(f"earthquakes in {asset['country']}")

        if settings['wildfire']:
            wildfire_data = get_news_data(f"wildfires in {asset['country']}")

        if settings['flood']:
            flood_data = get_news_data(f"floods in {asset['country']}")

        # finally, get Gemini to summarize
        summary_data = get_gemini_summary(asset, weather_data)

        # calculate the asset's risk number against a benchmark
        risk_score = calculate_risk_score(
            asset['type'], asset['years_of_use'], asset['last_incident']
        )

        # store the report in firestore
        report_data = {
            'weather': json.loads(weather_data),
            'earthquake': earthquake_data,
            'wildfires': wildfire_data,
            'flood': flood_data,
            'risk_score': risk_score,
            'summary': summary_data,
            'author': request.state.user['sub'],
            '_id': id
        }

        db.collection('reports').document(id).set(report_data)

        # To-DO make report generation asynchronous by sending an email notification to the user that the report is ready

        return {
            'message': 'Report generated successfully',
            'weather': json.loads(weather_data),
            'earthquake': earthquake_data,
            'wildfires': wildfire_data,
            'flood': flood_data,
            'risk_score': risk_score,
            'summary': summary_data
        }

    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )


def fetch_reports_controller(request: Request):
    try:
        user = request.state.user['sub']
        reports_ref = db.collection('reports')
        query = reports_ref.where('author', '==', user)
        reports = query.stream()
        reports_list = [report.to_dict() for report in reports]

        return {'message': 'Reports fetched successfully', 'data': reports_list}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺', message: str(e)}
        )


def fetch_report_controller(request: Request, id):
    try:
        data = db.collection('reports').document(id).get()
        return {'message': 'Report data fetched successfully', 'data': data.to_dict()}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )
