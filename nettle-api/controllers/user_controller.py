from firebase_admin import firestore
from fastapi import HTTPException, Request
from config.firebase import auth
from models import User


db  = firestore.client()

def fetch_user_controller(request: Request):
    try:
        uid = request.state.user["sub"]
        user = auth.get_user(uid)
        # Placeholder for token verification logic
        return {"message": "User details fetched successfully", "data": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching user details: {e}")



def fetch_user_profile_controller(request: Request):
    try:
        uid = request.state.user["sub"]
        user = db.collection('users').document(uid).get()
        return {"message": "User profile fetched successfully", "data": user.to_dict()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching user details: {e}")
    


def update_profile_controller(request: Request):
    try:
        uid = request.state.user["sub"]
        user_ref = db.collection('users').document(uid) 
        update_data = {key: value for key, value in request.state.body.dict(exclude_none=True).items()}
        
        if update_data:
            user_ref.update(update_data)

        if "display_name" in update_data:
            display_name = update_data["display_name"]
            auth.update_user(uid, display_name=display_name)
            
        return {"message": "User profile updated successfully", "data": update_data}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating user details: {e}")