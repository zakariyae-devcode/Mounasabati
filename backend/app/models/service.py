import enum
from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

import datetime
import uuid
from uuid import UUID
import enum


from app.models.vendor import Vendor
from app.models.reviews import Review
from app.models.booking import Booking
from app.models.client import Client



class ServiceStatus(enum.Enum): # غيرت الاسم لتجنب التكرار مع Status الحجز
    active = "active"
    inactive = "inactive"

class Service(SQLModel, table=True):
    __tablename__ = "services"
    id: UUID = Field(  default_factory=uuid.uuid4,
            primary_key=True,
            index=True,
            nullable=False,
            unique=True)
    vendor_id: UUID = Field(foreign_key="vendors.id")
    name: str = Field(index=True)
    description: str = Field(nullable=True)
    price: float = Field(default=0.0)
    image: str = Field(default="default_service.png")
    status: ServiceStatus = Field(default=ServiceStatus.active)
    created_at: datetime = Field(default_factory=datetime.datetime.utcnow)  
    updated_at:datetime=Field(default_factory=datetime.datetime.utcnow)  

     
    # العلاقات
    vendor: Optional["Vendor"] = Relationship(back_populates="services")
    user: Optional["Client"] = Relationship(back_populates="client_profile")
    reviews: List["Review"] = Relationship(back_populates="service")
    bookings: List["Booking"] = Relationship(back_populates="service")
    
    