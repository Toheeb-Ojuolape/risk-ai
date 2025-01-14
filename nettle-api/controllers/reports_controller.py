from firebase_admin import firestore
from fastapi.responses import JSONResponse
from fastapi import Request
from utils.get_weather_data import get_weather_forecast
from utils.get_news_data import get_news_data
from utils.get_gemini_summary import get_gemini_summary
import json
from utils.calculate_risk_factor import calculate_risk_score
from models import Asset
from config.firebase import auth
from services.email_service import send_email
import os
from templates.report_email import report_email

db = firestore.client()

FRONTEND_URL = os.getenv('FRONTEND_URL')


def generate_report_controller(request, id):
    try:
        query = request.url.query.split('&')
        uid = request.state.user['sub']

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

        # fetch the details of the user
        user = auth.get_user(uid)

        if settings['weather']:
            weather_data = get_weather_forecast(asset['city'])

        if settings['earthquake']:
            earthquake_data = get_news_data(f"earthquakes in the {asset['country']}")

        if settings['wildfire']:
            wildfire_data = get_news_data(f"wildfires in the {asset['country']}")

        if settings['flood']:
            flood_data = get_news_data(f"floods in the {asset['country']}")

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
            '_id': id,
            'country': asset['country'],
            'created_at': firestore.SERVER_TIMESTAMP
        }

        # send email notification to user that report is ready!
        url = f"{FRONTEND_URL}/reports/{id}"

        content = report_email(user._data['displayName'], asset['title'], url)

        send_email(user._data['email'], content, 'Your Report is Ready')

        db.collection('reports').document(id).set(report_data)

        return {'message': 'Report generated successfully'}

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


def delete_report_controller(request: Request, id):
    try:
        data = db.collection('reports').document(id).delete()
        return {'message': 'Report data deleted successfully', 'data': data.to_dict()}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )
