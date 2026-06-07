from fastapi import APIRouter,Depends,HTTPException,status,Response
from sqlmodel import Session,select
from core.database import get_session
from auth.security import hash_password,verify_password,create_access_token,get_current_user
from schemas.user import UserCreate,UserOut,UserLgoin,UserUpdate,ChangePassword
from models.user import User


router=APIRouter(prefix="auth/",tags=["Authentication"])


@router.get("/user", response_model=UserOut, status_code=status.HTTP_200_OK)
def get_user(current_user: User = Depends(get_current_user)):
    return current_user
  
             
@router.post("/register",status_code=status.HTTP_201_CREATED)
def register(user_data:UserCreate,session:Session=Depends(get_session)):

    existing_user=session.exec(select(User).where(User.username==user_data.username)|(User.email==user_data.email)|(User.CIN==user_data.CIN)).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="اسم المستخدم، البريد الإلكتروني، أو رقم البطاقة الوطنية (CIN) مسجل مسبقاً.")
    
    hashed_pwd=hash_password(user_data.password)

    new_user=User(
        username=user_data.username,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        CIN=user_data.CIN,
        password=hashed_pwd,
        
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"message": "تم إنشاء الحساب بنجاح", "user_id": new_user.id}

@router.patch("/update/{CIN}")
def update_user(CIN:str,user_data:UserUpdate,session:Session=Depends(get_session),current_user:User=Depends(get_current_user)):
    user=session.exe(select(User).where(User.CIN==CIN)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="المستخدم غير موجود")
    if current_user.CIN != CIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="غير مسموح لك بتعديل بيانات مستخدم آخر!"
        )
   
    update_data=user_data.model_dump(exclude_unset=True)

    

    for key,value in update_data.items():
        setattr(user,key,value)
    session.add(user)
    session.commit()
    session.refresh(user)


@router.delete("/delete/{CIN}")
def delete_user(CIN:str,session:Session=Depends(get_session),current_user:User=Depends(get_current_user)):
    user=session.exe(select(User).where(User.CIN==CIN)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="المستخدم غير موجود")
    if current_user.CIN != CIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="غير مسموح لك حدف بيانات مستخدم آخر!"
        )
    session.delete(user)
    session.commit()
    return {"message":"تم حذف المستخدم بنجاح"}
    

@router.post("/login")
def login(user_data:UserLgoin,session:Session=Depends(get_session)):
    user=session.exect(select(User).where(User.username==user_data.username)|(User.CIN==user_data.CIN)).first()
    verify_pwd=verify_password(user_data.password,user.password)

    if not user or not verify_pwd:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="اسم المستخدم,رقم البطاقة الوطنية أو كلمة المرور غير صحيحة")
    access_token=create_access_token(data={"sub":str(user.id),"role":user.role})

    return {"access_token":access_token,"token_type":"bearer"}



@router.post("/logout")
def logout(response:Response):
    response.delete_cookie(key="access_token")


@router.patch("/change-passowrd/")
def change_password(user_data:ChangePassword,session:Session=Depends(get_session),current_user:User=Depends(get_current_user)):
    
    if not verify_password(user_data.old_password,current_user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="كلمة المرور القديمة غير صحيحة")
    
    if not user_data.old_password ==user_data.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=""
        )
    hashed_new_password=hash_password(user_data.new_password)

    current_user.password=hashed_new_password

    session.add(current_user)

    session.commit()

    return {"message":"تم تغيير كلمة المرور بنجاح"}
    




    
    
    