from fastapi import Request
from firebase_admin import firestore
from fastapi.responses import JSONResponse
from models import Asset


db = firestore.client()


def create_asset_controller(request: Request):
    # create a new asset in Firebase Firestore
    try:
        data = request.state.body
        print(request.state.body)
        asset_ref = db.collection('assets').document()

        print(request.state.user['sub'])

        asset_data = {
            'title': data.title,
            'image': data.image,
            'pictures': data.pictures,
            'address': data.address,
            'longitude': data.longitude,
            'latitude': data.latitude,
            'years_of_use': data.years_of_use,
            'price': data.price,
            'last_incident': data.last_incident,
            'city': data.city,
            'country': data.country,
            'author': request.state.user['sub'],
            '_id': asset_ref.id
        }

        asset_ref.set(asset_data)
        return {'message': 'Asset created successfully'}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )


def fetch_asset_controller(request: Request):
    try:
        data = db.collection('assets').document(request.state.id).get()
        return {'message': 'Asset data fetched successfully', 'data': data.to_dict()}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )


def update_asset_controller(request: Request, id: str):
    try:
        uid = request.state.user['sub']
        ref = db.collection('assets').document(id)
        asset = ref.get()
        data = asset.to_dict()

        if uid != data['author']:
            return JSONResponse(
                status_code=400,
                content={
                    'error': 'Authorization Error 🥺!',
                    'message': "You can't edit this asset because you're not the author"
                }
            )
        update_data = {
            key: value
            for key, value in request.state.body.dict(exclude_none=True).items()
        }

        if update_data:
            ref.update(update_data)

        return {'message': 'Asset details updated successfully'}

    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={'error': 'Something went wrong 🥺!', 'message': str(e)}
        )
