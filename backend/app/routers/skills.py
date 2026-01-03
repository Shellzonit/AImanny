from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(prefix="/skills", tags=["skills"])

class SkillInput(BaseModel):
    name: str
    level: Optional[str] = None  # e.g., beginner, intermediate, advanced

class UserSkills(BaseModel):
    user_id: int
    skills: List[SkillInput]

class GoalInput(BaseModel):
    user_id: int
    target_role: str
    target_skills: List[SkillInput]

class MicroLesson(BaseModel):
    id: int
    title: str
    content: str
    skill: str
    difficulty: Optional[str] = None

# --- Endpoints ---

@router.post("/user")
def set_user_skills(skills: UserSkills, db: Session = Depends(get_db)):
    # Store or update user skills in DB (pseudo-code)
    # db.save_user_skills(skills.user_id, skills.skills)
    return {"message": "User skills updated"}

@router.get("/user/{user_id}")
def get_user_skills(user_id: int, db: Session = Depends(get_db)):
    # skills = db.get_user_skills(user_id)
    skills = []  # placeholder
    return {"user_id": user_id, "skills": skills}

@router.post("/goal")
def set_user_goal(goal: GoalInput, db: Session = Depends(get_db)):
    # db.save_user_goal(goal.user_id, goal.target_role, goal.target_skills)
    return {"message": "User goal updated"}

@router.get("/goal/{user_id}")
def get_user_goal(user_id: int, db: Session = Depends(get_db)):
    # goal = db.get_user_goal(user_id)
    goal = {}  # placeholder
    return {"user_id": user_id, "goal": goal}

@router.get("/gap/{user_id}")
def get_skill_gap(user_id: int, db: Session = Depends(get_db)):
    # Compare user skills to goal, return missing skills
    # user_skills = db.get_user_skills(user_id)
    # goal = db.get_user_goal(user_id)
    # gap = compute_gap(user_skills, goal)
    gap = []  # placeholder
    return {"user_id": user_id, "gap": gap}

@router.get("/microlearning/{user_id}")
def get_microlearning(user_id: int, db: Session = Depends(get_db)):
    # Recommend micro-lessons based on skill gap
    # gap = db.get_skill_gap(user_id)
    # lessons = db.get_micro_lessons_for_gap(gap)
    lessons = []  # placeholder
    return {"user_id": user_id, "microlearning": lessons}
