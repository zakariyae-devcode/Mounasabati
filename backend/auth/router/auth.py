from fastapi import APIRouter,Depends,HTTPException,status
from sqlmodel import Session,select
from core.database import get_session
from auth.security import hash_password,verify_password,create_access_token
from schemas.user import UserCreate,UserOut
from models.user import User


router=APIRouter(prefix="auth/",tags=["Authentication"])

@router.post("/register",status_code=status.HTTP_201_CREATED)
def register(user_data:UserCreate,session:Session=Depends(get_session)):

    existing_user=session.exec(select(User).where(User.username==user_data.username)|(User.email==user_data.email)|(User.CIN==user_data.CIN)).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="اسم المستخدم، البريد الإلكتروني، أو رقم البطاقة الوطنية (CIN) مسجل مسبقاً.")
    
    hash_password=hash_password(user_data.password)

    new_user=User(
        
    )

    
    
    