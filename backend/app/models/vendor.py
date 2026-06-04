from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
import uuid
from uuid import UUID
from app.models.user import User
from app.models.service import Service


class Vendor(SQLModel, table=True):
    __tablename__ = "vendors"
    id: UUID = Field(
        default_factory=uuid.uuid4, 
        primary_key=True, 
        index=True, 
        nullable=False
    )
    user_id: UUID = Field(foreign_key="users.id", nullable=False)

    phone: str = Field(default=None, index=True)
    city: str = Field(default=None, index=True)
    address: str = Field(default=None, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


    user: Optional["User"] = Relationship(back_populates="user")
    service: List["Service"] = Relationship(back_populates="service")




