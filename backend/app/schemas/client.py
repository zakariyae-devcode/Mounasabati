from pydantic import BaseModel,Field
from typing import Optional



class ClientCrete(BaseModel):
    Phone:Optional[str]=None
    City:Optional[str]=None
    Address:Optional[str]=None
    Image:Optional[str]=None

class ClientUpdate(BaseModel):
    Phone:Optional[str]=None
    City:Optional[str]=None
    Address:Optional[str]=None
    Image:Optional[str]=None


class ClientOut(BaseModel):
    Phone:str
    City:str
    Address:str
    Image:str
    
    class config:
        from_attributes=True
