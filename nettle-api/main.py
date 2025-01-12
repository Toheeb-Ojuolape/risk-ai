from fastapi import FastAPI, Request
from routes.auth_route import auth_router
from routes.user_route import user_router
from middleware.token import DecodeTokenMiddleware
from fastapi.middleware.cors import CORSMiddleware
from chainlit.utils import mount_chainlit


app = FastAPI()


origins = [
    "http://localhost:5173",
    "https://example.com",    
]



app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.add_middleware(DecodeTokenMiddleware)
app.include_router(user_router, prefix="/user", tags=["User"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/")
async def root():
    return {"message": "Nettle's FastAPI is running! ⚡️"}



mount_chainlit(app=app, target="nettle-ai.py", path="/assistant")