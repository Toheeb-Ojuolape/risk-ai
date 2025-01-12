from mailjet_rest import Client
import os
from fastapi import HTTPException


api_key = os.getenv('MJ_APIKEY_PUBLIC')
api_secret = os.getenv('MJ_APIKEY_SECRET')
mailjet = Client(auth=(api_key, api_secret))


def send_email(to: str, content: str, title: str):
    try:
        data = {
            'FromEmail': 'hello@digispray.app',
            'FromName': 'Nettle',
            'Subject': title,
            'Text-part': content,
            'Html-part': content,
            'Recipients': [{'Email': to}]
        }
        result = mailjet.send.create(data=data)
        return result.json()

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error sending email {e}")
