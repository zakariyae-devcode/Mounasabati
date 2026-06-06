from fastapi import FastAPI

from sqlmodel import SQLModel
from app.core.database import engine


SQLModel.metadata.create_all(bind=engine)
app = FastAPI()


@app.get("/")
def hello_word():
    return {"message":"Hello World"}