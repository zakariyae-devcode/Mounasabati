from pydantic import BaseModel ,EmailStr,Field
from typing import Optional

class UserCreate(BaseModel):
    Username:str=Field(...,min_length=4,max_length=16)
    Email:EmailStr
    First_name:Optional[str]=None
    Last_name:Optional[str]=None
    CIN:str=Field(...,pattern=r"^[A-Z,a-z]{1,2}\d{6,7}$") # exmple => d1234567 FB118450
    Password:str=Field(...,min_length=8,max_length=16)
    Role:str=Field(...,pattern=r"^(client|vendor)$")

    ImageProfile=Optional[str]=None



class UserOut(BaseModel):
    Username:str=Field(...,min_length=4,max_length=16)
    Email:EmailStr
    First_name:Optional[str]=None
    Last_name:Optional[str]=None
    CIN:str
    Role:str


    class cofig:
        from_attributes=True


class UserUpdate(BaseModel):
    Username:Optional[str]=None
    Email:Optional[EmailStr]=None
    First_name:Optional[str]=None
    Last_name:Optional[str]=None
   
 
class UserLgoin(BaseModel):
   Username:str=Field(...,min_length=4,max_length=16)
   Password:str=Field(...,min_length=8,max_length=16)