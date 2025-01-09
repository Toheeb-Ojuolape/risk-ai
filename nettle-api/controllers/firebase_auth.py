from firebase_admin import (
    exceptions,
    firestore
)  # Import the correct module for exceptions
from fastapi import HTTPException
from middleware.token import create_access_token
from config.firebase import auth


db = firestore.client()


def signup_user(email: str, password: str, display_name: str, company_name: str):
    try:
        user = auth.create_user(
            email=email, password=password, display_name=display_name
        )
        # verification_link = auth.generate_email_verification_link(
        #     email,
        #     action_code_settings=auth.ActionCodeSettings(
        #         url="https://nettle-api.firebaseapp.com/login", handle_code_in_app=False
        #     ),
        # )

        # chore: send this link to users via email print(verification_link)
        # chore: add the link to the project's preview as an authorized domain
        # add record to the database
        user_data = {
            'email': email,
            'display_name': display_name,
            'uid': user.uid,
            'company_name': company_name,
            'created_at': firestore.SERVER_TIMESTAMP
        }

        print(user)

        db.collection('users').document(user.uid).set(user_data)
        token = create_access_token(user.uid)

        return {'message': 'User created successfully', 'token': token}
    except exceptions.FirebaseError as e:  # Handle Firebase errors here
        raise HTTPException(status_code=400, detail=f"Error creating user: {e}")


def login_user(uid: str):
    try:
        # Placeholder for token verification logic
        token = create_access_token(uid)
        user = auth.get_user(uid)
        return {'message': 'User logged in successfully', 'data': user, 'token': token}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail=f"Error sending password reset email: {e}"
        )


def forgot_password(email: str):
    try:
        link = auth.generate_password_reset_link(
            email,
            action_code_settings=auth.ActionCodeSettings(
                url='https://nettle-api.firebaseapp.com/login', handle_code_in_app=False
            )
        )
        return {'message': 'Password reset link sent successfully', 'link': link}
    except exceptions.FirebaseError as e:  # Handle Firebase errors here
        raise HTTPException(
            status_code=400, detail=f"Error sending password reset email: {e}"
        )
