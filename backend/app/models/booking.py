
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

import datetime
import uuid
from uuid import UUID
import enum
from app.models.user import User
from app.models.service import Service

class BookingStatus(enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    paid = "paid"
    cancelled = "cancelled"


class Booking(SQLModel,table=True):
    __tablename__ = "bookings"
    id: UUID = Field(
            default_factory=uuid.uuid4,
            primary_key=True,
            index=True,
            nullable=False,
            unique=True
        )
    service_id: UUID = Field(foreign_key="services.id")
    user_id: UUID = Field(foreign_key="users.id")
    event_date: datetime.date = Field(nullable=False)
    event_time: datetime.time  =Field(nullable=False)
    total_price: float = Field(default=0.0)
    status: BookingStatus = Field(default=BookingStatus.pending)

    user: Optional["User"] = Relationship(back_populates="user")
    service: Optional["Service"] = Relationship(back_populates="service")






