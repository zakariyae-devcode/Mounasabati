from sqlmodel import create_engine, Session, SQLModel
# استيراد كل الموديلات دفعة واحدة

# مسار مباشر وصريح وقصير جداً
DATABASE_URL = "sqlite:///mounasabati.db"

engine = create_engine(DATABASE_URL, echo=True)

#SQLModel.metadata.create_all(bind=engine)


def get_session():
    with Session(engine) as session:
        yield session