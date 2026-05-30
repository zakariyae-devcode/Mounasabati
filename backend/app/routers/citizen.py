from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.citizen import Citizen
from app.schemas.citizen import CitizenCreate,CitizenOut,CitizenLogin
