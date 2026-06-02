from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.vendor import VendorOut

class ServiceCreate(BaseModel):
    name: str = Field(..., min_length=4, max_length=50)
    price_base: float = Field(..., gt=0)
    image: Optional[str] = None
    status: Optional[str] = "active" 

class ServiceUpdate(BaseModel):
    service_name: Optional[str] = Field(None, min_length=4, max_length=16)
    price_base: Optional[float] = Field(None, gt=0)
    image: Optional[str] = None

class ServiceOut(BaseModel):
    id: int 
    name: str
    price_base: float
    image: Optional[str] 
    status: str

    class Config: 
        from_attributes = True

class ServiceDetailOut(ServiceOut):
    description: Optional[str] = None
    vendor: VendorOut 