from pydantic import BaseModel,Field
from datetime import date, time
from typing import Optional



class BookingCreate(BaseModel):
        event_date: date
        event_time: time
        total_price: float = Field(..., gt=0)
        status: Optional[str] = "pending"



class BookingReceipt(BaseModel):
    booking_id: int
    service_name: str
    event_date: date
    event_time: time
    total_price: float
    Status: str
    message: str = "تم تأكيد حجزك بنجاح! شكراً لاختيارك مناسبتي."