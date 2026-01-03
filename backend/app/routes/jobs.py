from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from app.database import SessionLocal

from app.models.job_models import Job as JobModel
from app.auth import get_current_user

router = APIRouter()

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: float

class JobOut(BaseModel):
    id: int
    title: str
    description: str
    location: str
    salary: float

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[JobOut])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(JobModel).all()

@router.post("/", response_model=JobOut)
def add_job(job: JobCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_job = JobModel(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job
