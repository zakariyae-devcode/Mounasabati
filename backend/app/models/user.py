from sqlalchemy import Column,Integer,String,Enum,ForeignKey,Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


class UserRole(enum.Enum):
    client="client"
    vendor="vendor"


class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,unique=True,index=True)
    first_name=Column(String,index=True,nullable=False)
    last_name=Column(String,index=True,nullable=False)
    email=Column(String,unique=True,index=True)
    CIN=Column(String,unique=True,index=True)
    role=Column(Enum(UserRole),defualt=UserRole.client)
    password=Column(String)

    client=relationship("Client",back_populates="user")
    vendor=relationship("Vendor",back_populates="user")


class Client(Base):
    __tablename__="clients"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    users=relationship("User",back_populates="client")
    phone=Column(String,index=True)
    city=Column(String,index=True)
    address=Column(String,index=True)

class Vendor(Base):
    __tablename__="vendors"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    users=relationship("User",back_populates="vendor")
    business_name=Column("String",index=True)
    phone=Column(String,index=True)
    city=Column(String,index=True)
    
    rc_number=Column(String,index=True)
    address=Column(String,index=True)
    description=Column(Text,nullable=False)

