# --- Resume QR Code Endpoint ---
from pydantic import BaseModel
from fastapi.responses import JSONResponse

class ResumeQRInput(BaseModel):
    resume: str

@router.post("/resume_qr")
def resume_qr(data: ResumeQRInput):
    from app.services.career_service import generate_resume_qr_service
    qr_b64 = generate_resume_qr_service(data.resume)
    return JSONResponse(content={"qr_code_base64": qr_b64})
# --- Post-Job-Offer Transition Checklist Endpoint ---
@router.get("/transition_checklist")
def transition_checklist():
    from app.services.career_service import get_transition_checklist_service
    return get_transition_checklist_service()
# --- Climate/Location Info Endpoint ---
class LocationInfoInput(BaseModel):
    location: str

@router.post("/location_info")
def location_info(data: LocationInfoInput):
    from app.services.career_service import get_location_info_service
    info = get_location_info_service(data.location)
    return info
# --- Job Buddy System ---
from typing import Literal

class SponsorSignupInput(BaseModel):
    name: str
    email: str
    expertise: List[str]
    consent: bool

@router.post("/job_buddy/sponsor_signup")
def sponsor_signup(data: SponsorSignupInput):
    from app.services.career_service import sponsor_signup_service
    result = sponsor_signup_service(data)
    return result

class BuddyRequestInput(BaseModel):
    user_email: str
    preference: Literal["ai", "human"]
    interests: List[str]

@router.post("/job_buddy/request")
def buddy_request(data: BuddyRequestInput):
    from app.services.career_service import buddy_request_service
    result = buddy_request_service(data)
    return result
# --- Company Info and Attire Recommendation Endpoint ---
class CompanyInfoInput(BaseModel):
    company: str
    job_title: Optional[str] = None

@router.post("/company_info")
def company_info(data: CompanyInfoInput):
    from app.services.career_service import get_company_info_service
    info = get_company_info_service(data.company, data.job_title)
    return info
# --- Prior Job to AI Job Mapping Endpoint ---
class PriorJobInput(BaseModel):
    prior_jobs: List[str]

@router.post("/map_prior_jobs")
def map_prior_jobs(data: PriorJobInput):
    from app.services.career_service import map_prior_jobs_service
    ai_jobs = map_prior_jobs_service(data.prior_jobs)
    return {"suggested_ai_jobs": ai_jobs}
# --- AI Job Listings Endpoint ---
from fastapi import Query

@router.get("/ai_jobs")
def get_ai_jobs(mobile_only: bool = Query(False, description="Return only mobile AI jobs")):
    from app.services.career_service import get_ai_jobs_service
    jobs = get_ai_jobs_service(mobile_only=mobile_only)
    return {"ai_jobs": jobs}

# --- Qualification Matching Endpoint ---

class QualificationInput(BaseModel):
    qualifications: List[str]
    mobile_only: Optional[bool] = False

@router.post("/match_qualifications")
def match_qualifications(data: QualificationInput):
    from app.services.career_service import match_qualifications_service
    matches = match_qualifications_service(data.qualifications, mobile_only=data.mobile_only)
    return {"matched_jobs": matches}

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

# Updated InterviewInput to include user email and interview details
class InterviewInput(BaseModel):
    answers: List[str]
    user_email: str
    interview_time: Optional[str] = None  # ISO format or readable string

@router.post("/mock_interview")
def mock_interview(interview: InterviewInput):
    from app.services.career_service import mock_interview_service
    from app.email_utils import send_email
    result = mock_interview_service(interview.answers)
    # Send interview alert email if email provided
    if interview.user_email:
        subject = "Your Mock Interview Details"
        html = f"""
        <h2>Mock Interview Scheduled</h2>
        <p>Your mock interview is scheduled for: <b>{interview.interview_time or 'TBD'}</b></p>
        <p>Good luck! After your interview, you'll receive feedback and a score from the AI bot.</p>
        <p>If you score low, you'll be invited to a VR study session to help you improve!</p>
        """
        try:
            send_email(interview.user_email, subject, html)
        except Exception as e:
            result["email_status"] = f"Failed to send email: {e}"
        else:
            result["email_status"] = "Interview alert email sent."
    return result

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
