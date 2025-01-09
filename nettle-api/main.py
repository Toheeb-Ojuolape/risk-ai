from fastapi import FastAPI, Request
from routes.auth_route import auth_router
from routes.user_route import user_router
from middleware.token import DecodeTokenMiddleware

app = FastAPI()


app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.add_middleware(DecodeTokenMiddleware)
app.include_router(user_router, prefix="/user", tags=["User"])


@app.get("/")
async def root():
    return {"message": "Nettle's FastAPI is running! ⚡️"}
