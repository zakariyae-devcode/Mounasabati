from sqlalchemy import Column,Integer,String,ForeignKey,Text,DATETIME
from sqlalchemy.orm import relationship
from app.core.database import Base

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    business_name = Column(String, index=True) # حذف الكوتيشن الزائدة حول String
    phone = Column(String, index=True)
    city = Column(String, index=True)
    rc_number = Column(String, index=True)
    address = Column(String, index=True)
    description = Column(Text, nullable=True)

 
    user = relationship("User", back_populates="vendor_profile")
    services = relationship("Service", back_populates="vendor")
