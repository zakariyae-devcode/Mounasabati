from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.citizen import Citizen
from app.schemas.citizen import CitizenCreate,CitizenOut,CitizenLogin,CitizenUpdate


router = APIRouter(prefix="/citizens",tage=["Citizens"])


@router.post("/register",response_model=CitizenOut)
def register(citizen_data:CitizenCreate,db:Session=Depends(get_db)):
    
    existing_citizen=db.query(Citizen).filter(Citizen.NationalID==citizen_data.NationalID).first()

    if existing_citizen:
        
        raise HTTPException(status_code=400,detail="this citizen is already registered")
    
    new_citizen=Citizen( 
        FullName=citizen_data.FullName,
        NationalID=citizen_data.FullName,
        PhoneNumber=citizen_data.FullName,
        Email=citizen_data.FullName,
        City=citizen_data.FullName,
        Address=citizen_data.FullName,
        Password_hash=citizen_data.FullName
    )
    db.add(new_citizen)
    db.commit()
    db.refresh(new_citizen)

    return new_citizen

@router.patch("/update/{national_id}",response_model=CitizenOut)
def update_profile(national_id:str,update_data:CitizenUpdate,db:Session=Depends(get_db)):
    citizen_query=db.query(Citizen).filter(Citizen.NationalID==national_id).first()

    if(not citizen_query):
        raise HTTPException(status_code=404,detail="Citizen not found")
    
    update_citizen=update_data.model_dump(exclude_unset=True)
    citizen_query.update(update_citizen)
    db.commit()
    db.refresh(citizen_query)

    return {"message": f"Citizen with national ID {national_id} has been updated successfully"}
    
@router.delete("/delete/{national_id}")
def delete_profile(national_id:str,db:Session=Depends(get_db)):
    citizen_query=db.query(Citizen).filter(Citizen.NationalID==national_id).first()

    if not citizen_query:
        raise HTTPException(status_code=404,detail="Citizen not found")
    
    db.delete(citizen_query)
    db.commit()
    return {"message": f"Citizen with national ID {national_id} has been deleted successfully"}


@router.get("/{national_id}",response_model=CitizenOut)
def get_profile(national_id:str,db:Session=Depends(get_db)):

    citizen_query=db.query(Citizen).filter(Citizen.NationalID==national_id).first()

    if not citizen_query:
        raise HTTPException(status_code=404,detail="Citizen not found")
    
    return citizen_query

    




       
    
