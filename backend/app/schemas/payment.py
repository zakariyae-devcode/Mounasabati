from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.payment import PaymentStatus 
from app.schemas.user import UserOut
from app.schemas.booking import BookingReceipt

class PaymentCreate(BaseModel):
  
    amount: float
    currency: str = "MAD"  
    TransactionID: Optional[str] = None  


class PaymentUpdate(BaseModel):
    paymentStatus: PaymentStatus
    TransactionID: Optional[str] = None


class PaymentRead(BaseModel):
    id: UUID
    booking: BookingReceipt
    user: UserOut
    amount: float
    currency: str
    paymentStatus: PaymentStatus
    TransactionID: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  