import jwt
import datetime
from fastapi import Request, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from fastapi.responses import JSONResponse

# Load environment variables from .env file
load_dotenv()

# Fetch SECRET_KEY from environment variable
SECRET_KEY = os.getenv("SECRET_KEY", "secret")


# Expiration time for the JWT token (e.g., 1 hour)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(data: str, expires_delta: datetime.timedelta = None):
    try:
        to_encode = {"sub": data}  # 'sub' is a common claim name (subject)
        if expires_delta:
            expire = datetime.datetime.utcnow() + expires_delta
        else:
            expire = datetime.datetime.utcnow() + datetime.timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})  # Add the expiration claim
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # Encode the JWT
        return encoded_jwt
    except Exception as e:
            print(e)
            return JSONResponse(
                status_code=400, content={"error": "Something went wrong 🥺 ! ", "message": "bad gut"}
            )


# OAuth2PasswordBearer is used to extract the token from the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def decode_token(token: str):
    try:
        # Decode the token using the secret key and algorithm
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Check if the token has expired
        if datetime.datetime.utcnow() > datetime.datetime.utcfromtimestamp(payload["exp"]):
            raise HTTPException(status_code=401, detail="Token has expired")
        
        # Return the decoded payload
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


class DecodeTokenMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            if request.url.path.startswith("/user"):
                token: Optional[str] = request.headers.get("Authorization")

                if token is None:
                    raise HTTPException(
                        status_code=401, detail="Authorization token is missing"
                    )

                token = token.split(" ")[1] if token.startswith("Bearer ") else token

                # Decode the token
                payload = decode_token(token)

                # Attach the decoded payload to the request's state
                request.state.user = payload

            # Proceed with the request
            response = await call_next(request)
            return response

        except HTTPException as e:
            # Handle FastAPI's HTTPException specifically
            return JSONResponse(
                status_code=e.status_code,
                content={"error": "Authorization Error", "message": e.detail}
            )
        except Exception as e:
            return JSONResponse(
                status_code=400,
                content={"error": "Something went wrong 🥺!", "message": str(e)}
            )
