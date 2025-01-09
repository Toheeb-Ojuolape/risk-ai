import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./firebase-config.json")
firebase_admin.initialize_app(cred)

# Expose the `auth` object for use in controllers
firebase_auth = auth