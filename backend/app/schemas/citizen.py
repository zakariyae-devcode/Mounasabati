from pydantic import BaseModel,EmailStr
from typing import Optional


##endpoit for creating a new citizen (post)
class CitizenCreate(BaseModel):
    FullName:str
    NationalID:str
    PhoneNumber:str
    Email:Optional[EmailStr]=None
    City:str
    Address:str
    Password_hash:str

##endpoint for retrieving citizen information (get)
class CitizenOut(BaseModel):
    FullName:str
    NationalID:str
    PhoneNumber:str
    Email:Optional[EmailStr]=None
    City:str
    Address:str
   
    class Config:
        from_attributes = True

##endpoint for updating citizen information (put,patch)
class CitizenUpdate(BaseModel):
    FullName:Optional[str]=None
    PhoneNumber:Optional[str]=None
    Email:Optional[EmailStr]=None
    City:Optional[str]=None
    Address:Optional[str]=None
   
##endpoint for citizen login (post)
class CitizenLogin(BaseModel):
    NationalID:str
    Password_hash:str