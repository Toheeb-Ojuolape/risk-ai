# models.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    email: str
    password: str
    display_name: str
    company_name: str

class Login(BaseModel):
    uid: str

class ForgotPassword(BaseModel):
    email: str


class UpdateUser(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    display_name: Optional[str] = None
    company_name: Optional[str] = None


class Asset(BaseModel):
    title: str
    image: Optional[str] = None
    pictures: Optional[list] = None
    address: str
    longitude: float
    latitude: float
    years_of_use: int
    price: float
    last_incident: str
    city: str
    country: str
    author: Optional[str] = None


class UpdateAsset(BaseModel):
    title: Optional[str] = None
    image: Optional[str] = None
    pictures: Optional[list] = None
    address: Optional[str] = None
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    years_of_use: Optional[int] = None
    price: Optional[float] = None
    last_incident: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None