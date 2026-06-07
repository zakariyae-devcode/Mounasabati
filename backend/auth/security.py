from dotenv import load_dotenv
import os
from sqlmodel import Session, select
from models.user import User
from uuid import UUID
from core.database import get_session
from datetime import datetime,timedelta,timezone
from typing import Optional
from passlib.context import CryptContext
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
load_dotenv()

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="auth/login")

def hash_password(password:str)->str:
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str)->bool:
    return pwd_context.verify(plain_password,hashed_password)


def create_access_token(data:dict,expires_delta:Optional[timedelta]=None)->str:
    to_encode=data.copy()
    if expires_delta:
        expire=datetime.now(timezone.utc)+expires_delta
    else:
        expire=datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    encoded_jwt=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    credentials_exception=HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
            payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
            user_id:str=payload.get("sub")
            if user_id is None:
                raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    
    statement = select(User).where(User.id == UUID(user_id))

    user = session.exec(statement).first()
    if user is None:
        raise credentials_exception
    return user

