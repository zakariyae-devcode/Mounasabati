
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship,CheckConstraint

import datetime
import uuid
from uuid import UUID

from app.models.user import User
from app.models.service import Service

class Review(SQLModel,table=True):
    __tablename__="reviews"

    id: UUID = Field(
        default_factory=uuid.uuid4, 
        primary_key=True, 
        index=True, 
        nullable=False
    )

    service_id: UUID = Field(foreign_key="services.id")
    user_id: UUID = Field(foreign_key="users.id")

    rating:Optional[int]=Field()

    created_at: datetime = Field(default_factory=datetime.datetime.utcnow)  
    updated_at:datetime=Field(default_factory=datetime.datetime.utcnow)  

    user: Optional["User"] = Relationship(back_populates="user")
    service: Optional["Service"] = Relationship(back_populates="service")


    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    )




    

