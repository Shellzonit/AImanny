from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import microlearning

router = APIRouter(prefix="/microlearning", tags=["Microlearning"])

@router.get("/lessons/{skill}")
def get_lessons(skill: str, db: Session = Depends(get_db)):
    # Return all lessons for a skill
    lessons = db.query(microlearning.MicroLesson).filter(microlearning.MicroLesson.skill == skill).all()
    return [
        {"id": l.id, "skill": l.skill, "content": l.content, "quiz": l.quiz} for l in lessons
    ]

@router.post("/progress/")
def update_progress(user_id: int, lesson_id: int, completed: bool, score: int = 0, db: Session = Depends(get_db)):
    # Update or create user progress
    progress = db.query(microlearning.UserLessonProgress).filter_by(user_id=user_id, lesson_id=lesson_id).first()
    if not progress:
        progress = microlearning.UserLessonProgress(user_id=user_id, lesson_id=lesson_id, completed=completed, score=score)
        db.add(progress)
    else:
        progress.completed = completed
        progress.score = score
        progress.last_accessed = datetime.datetime.utcnow()
    db.commit()
    return {"success": True}

@router.get("/progress/{user_id}")
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    # Return all lesson progress for a user
    progress = db.query(microlearning.UserLessonProgress).filter_by(user_id=user_id).all()
    return [
        {"lesson_id": p.lesson_id, "completed": p.completed, "score": p.score, "last_accessed": p.last_accessed} for p in progress
    ]
