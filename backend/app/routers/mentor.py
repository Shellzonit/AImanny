from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db

from ..crud import mentor as mentor_crud
from ..models.mentor import Mentor
from ..models.user import User

router = APIRouter(prefix="/mentor", tags=["mentor"])

class MentorProfile(BaseModel):
    user_id: int
    bio: Optional[str] = None
    expertise: Optional[str] = None  # comma-separated
    available: Optional[bool] = True
    goals: Optional[str] = None  # comma-separated

class MatchRequest(BaseModel):
    user_id: int
    interests: List[str]
    goals: Optional[List[str]] = None


@router.post("/profile")
def create_or_update_mentor_profile(profile: MentorProfile, db: Session = Depends(get_db)):
    mentor = mentor_crud.get_mentor_by_user_id(db, profile.user_id)
    if mentor:
        mentor = mentor_crud.update_mentor(
            db, mentor,
            bio=profile.bio,
            expertise=profile.expertise,
            available=profile.available,
            goals=profile.goals
        )
    else:
        mentor = mentor_crud.create_mentor(
            db,
            user_id=profile.user_id,
            bio=profile.bio,
            expertise=profile.expertise,
            available=profile.available,
            goals=profile.goals
        )
    return {"mentor": mentor.id, "message": "Mentor profile updated"}


@router.get("/profile/{user_id}")
def get_mentor_profile(user_id: int, db: Session = Depends(get_db)):
    mentor = mentor_crud.get_mentor_by_user_id(db, user_id)
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return {"user_id": user_id, "mentor": {
        "id": mentor.id,
        "bio": mentor.bio,
        "expertise": mentor.expertise,
        "available": mentor.available,
        "goals": mentor.goals
    }}


@router.post("/match")
def match_mentor(request: MatchRequest, db: Session = Depends(get_db)):
    # Simple match: filter mentors by expertise/goals substring match
    all_mentors = mentor_crud.get_all_mentors(db)
    matches = []
    for m in all_mentors:
        if not m.available:
            continue
        expertise = (m.expertise or '').lower()
        goals = (m.goals or '').lower()
        if any(interest.lower() in expertise for interest in request.interests) or \
           (request.goals and any(goal.lower() in goals for goal in request.goals)):
            matches.append({
                "id": m.id,
                "user_id": m.user_id,
                "bio": m.bio,
                "expertise": m.expertise,
                "goals": m.goals
            })
    return {"matches": matches}


@router.post("/assign")
def assign_mentor(user_id: int, mentor_id: int, db: Session = Depends(get_db)):
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    mentee = db.query(User).filter(User.id == user_id).first()
    if not mentor or not mentee:
        raise HTTPException(status_code=404, detail="Mentor or mentee not found")
    mentor_crud.assign_mentor_to_user(db, mentor, mentee)
    return {"message": f"Mentor {mentor_id} assigned to user {user_id}"}


@router.get("/mentees/{mentor_id}")
def get_mentees(mentor_id: int, db: Session = Depends(get_db)):
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    mentees = mentor_crud.get_mentees_for_mentor(db, mentor)
    mentee_list = [{"id": m.id, "name": getattr(m, 'name', None)} for m in mentees]
    return {"mentor_id": mentor_id, "mentees": mentee_list}
