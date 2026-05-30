from sqlalchemy import create_engine
from sqlalchemy.ext import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL= "sqlite:///./mounasabati.db"

engin=create_engine(SQLALCHEMY_DATABASE_URL,connect_args={"check"})

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engin)

Base=declarative_base()


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close