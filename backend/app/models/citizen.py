from sqlalchemy import Column,Integer,String
from app.database import Base

class Citizen(Base):
    __tablename__="citizens"
    id=Column(Integer,primary_key=True,index=True)
    FullName=Column(String)
    NationalID=Column(String,uinque=True,index=True)
    PhoneNumber=Column(String)
    Email=Column(String,unique=True,index=True)
    Address=Column(String)
    Password_hash = Column(String, nullable=False)
    City = Column(String, nullable=False)
