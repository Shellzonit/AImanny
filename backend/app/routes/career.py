
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import SessionLocal
from app.models.career_models import CareerResource, CareerTip, MockInterview
from app.models.user_models import User
from app.auth import get_current_user
from app.email_utils import send_email

router = APIRouter()

# Schemas
class ResourceCreate(BaseModel):
    title: str
    content: str

class ResourceOut(ResourceCreate):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class TipCreate(BaseModel):
    tip: str

class TipOut(TipCreate):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class MockInterviewCreate(BaseModel):
    scheduled_date: datetime
    interview_date: datetime

class MockInterviewOut(BaseModel):
    id: int
    user_id: int
    scheduled_date: datetime
    score: Optional[int]
    feedback: Optional[str]
    created_at: datetime
    interview_date: Optional[datetime]
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Resume Grading Endpoint ---
class ResumeInput(BaseModel):
    resume_text: str

@router.post("/grade_resume")
def grade_resume(resume: ResumeInput):
    # Call service to grade resume
    from app.services.career_service import grade_resume_service
    result = grade_resume_service(resume.resume_text)
    return {"grade": result["grade"], "feedback": result["feedback"]}

# --- Mock Interview Endpoint ---
class InterviewInput(BaseModel):
    answers: List[str]

@router.post("/mock_interview")
def mock_interview(interview: InterviewInput):
    from app.services.career_service import mock_interview_service
    result = mock_interview_service(interview.answers)
    return {"score": result["score"], "feedback": result["feedback"]}

# --- Job Alignment Planning Endpoint ---
class JobAlignmentInput(BaseModel):
    skills: List[str]
    interests: List[str]

@router.post("/job_alignment")
def job_alignment(data: JobAlignmentInput):
    from app.services.career_service import job_alignment_service
    result = job_alignment_service(data.skills, data.interests)
    return {"suggested_jobs": result}

# Career Resources
@router.post("/resources", response_model=ResourceOut)
def add_resource(resource: ResourceCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_resource = CareerResource(**resource.dict())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@router.get("/resources", response_model=List[ResourceOut])
def list_resources(db: Session = Depends(get_db)):
    return db.query(CareerResource).all()

# Career Tips
@router.post("/tips", response_model=TipOut)
def add_tip(tip: TipCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_tip = CareerTip(**tip.dict())
    db.add(db_tip)
    db.commit()
    db.refresh(db_tip)
    return db_tip

@router.get("/tips", response_model=List[TipOut])
def list_tips(db: Session = Depends(get_db)):
    return db.query(CareerTip).all()

# Mock Interview
@router.post("/mock-interview", response_model=MockInterviewOut)
def mock_interview(
    data: MockInterviewCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    # Simulate scoring (random or simple logic)
    import random
    score = random.randint(1, 10)
    feedback = "Great job!" if score > 5 else "Needs improvement. Study sessions scheduled."
    mock = MockInterview(
        user_id=user.id,
        scheduled_date=data.scheduled_date,
        score=score,
        feedback=feedback,
        interview_date=data.interview_date
    )
    db.add(mock)
    db.commit()
    db.refresh(mock)
    # If score is low, schedule study sessions and email
    if score == 1:
        study_days = (data.interview_date - datetime.utcnow()).days
        for i in range(study_days):
            # In a real app, you'd schedule a background task or notification for each day
            pass  # Placeholder for study session logic
        # Schedule email notification for interview day
        background_tasks.add_task(
            send_email,
            to=user.email,
            subject="Interview Reminder",
            html=f"<p>Your interview is scheduled for {data.interview_date.strftime('%Y-%m-%d %H:%M')}. Good luck!</p>"
        )
    return mock

@router.get("/mock-interviews", response_model=List[MockInterviewOut])
def list_mock_interviews(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(MockInterview).filter(MockInterview.user_id == user.id).all()
