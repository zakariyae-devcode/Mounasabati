from pydantic import BaseModel, Field
from typing import Optional
from app.schemas import vendor
class ServiceCreate(BaseModel):
    service_name: str = Field(..., min_length=4, max_length=16)
    price_base: float = Field(..., gt=0)
    image: Optional[str] = None
    status: Optional[str] = "active" 

class ServiceUpdate(BaseModel):
    service_name: Optional[str] = Field(None, min_length=4, max_length=16)
    price_base: Optional[float] = Field(None, gt=0)
    image: Optional[str] = None

class ServiceOut(BaseModel):
    id: int 
    service_name: str
    price_base: float
    image: Optional[str] 
    status: str
  

    class Config: 
        from_attributes = True

class ServiceDetailOut(ServiceOut):
   
    description: Optional[str] = None
    vendor: vendor.VendorOut 

    class Config:
        from_attributes = True