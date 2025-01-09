from fastapi import APIRouter, Request
from controllers.user_controller import (
    fetch_user_controller,
    fetch_user_profile_controller,
    fetch_user_controller,
    update_profile_controller
)
from models import UpdateUser, Asset, UpdateAsset
from controllers.assets_controller import create_asset_controller, fetch_asset_controller, update_asset_controller
from controllers.reports_controller import generate_report_controller

# Initialize the router
user_router = APIRouter()



# User Management
@user_router.get("/")
async def user(request: Request):
    return fetch_user_controller(request)


@user_router.get("/profile")
async def user_profile(request: Request):
    return fetch_user_profile_controller(request)


@user_router.put("/profile")
async def update_profile(request: Request, data: UpdateUser):
    request.state.body = data
    return update_profile_controller(request)



# Asset Management
@user_router.post("/asset")
async def create_asset(request: Request, asset: Asset):
    print(asset)
    request.state.body = asset
    return create_asset_controller(request)


@user_router.get("/asset/{id}")
async def get_asset(request: Request, id: str):
    request.state.id = id
    return fetch_asset_controller(request)


@user_router.put("/asset/{id}")
async def update_asset(request: Request, id: str, asset: UpdateAsset):
    request.state.body = asset
    return update_asset_controller(request, id)
    


#Report Management
@user_router.get("/report/{id}")
async def generate_report(request: Request, id: str):
    return generate_report_controller(request, id)
