from fastapi import APIRouter
from controllers.firebase_auth import signup_user, login_user, forgot_password
from models import User, Login, ForgotPassword

# Initialize the router
auth_router = APIRouter()


@auth_router.post("/signup")
async def signup(payload: User):
    return signup_user(payload.email, payload.password, payload.display_name, payload.company_name)

@auth_router.post("/login")
async def login(payload: Login):
    return login_user(payload.uid)

@auth_router.post("/forgot-password")
async def forgot_password_endpoint(payload: ForgotPassword):
    return forgot_password(payload.email)
