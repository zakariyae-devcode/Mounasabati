from pydantic import Field,BaseModel
from typing import Optional



class VendorCreate(BaseModel):
    Business_name:str=Field(...,min_length=4,max_length=16)
    Phone:str=Field(...,min_length=8,max_length=16)
    City:str=Field(...,min_length=4,max_length=16)
    Address:str=Field(...,min_length=4,max_length=16)
    RC_number:str=Field(...,min_length=4,max_length=16)
    Description:Optional[str]=None
    