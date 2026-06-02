from pydantic import BaseModel,Field
from datetime import date, time

from app.schemas.service import ServiceOut



class BookingCreate(BaseModel):
    service_id: int
    event_date: date
    event_time: time 
    total_price: float = Field(..., gt=0)

class BookingReceipt(BaseModel):
    id: int
    event_date: date
    total_price: float
    status: str
    service: ServiceOut # يعطيك تفاصيل الخدمة المحجوزة
    message: str = "تم تأكيد حجزك بنجاح! شكراً لاختيارك مناسبتي."

    class Config:
        from_attributes = True