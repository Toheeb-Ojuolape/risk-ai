from fastapi import FastAPI
import random

app = FastAPI()

@app.get("/")


async def root():
    return {"message": "Nettle's FastAPI is running! ⚡️"}

