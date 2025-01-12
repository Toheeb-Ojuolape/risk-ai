from middleware.token import decode_token
from config.firebase import auth


async def fetch_user(token: str):
    try:
        user = decode_token(token)
        user_data = auth.get_user(user['sub'])
        # Placeholder for token verification logic
        return user_data
    except Exception as e:
        return {_data: {displayName: 'Anonymous'}}
