from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import goals

router = APIRouter(prefix="/goals", tags=["Goals"])

@router.post("/add/")
def add_goal(user_id: int, goal: str, db: Session = Depends(get_db)):
    new_goal = goals.UserGoal(user_id=user_id, goal=goal)
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return {"id": new_goal.id, "goal": new_goal.goal, "completed": new_goal.completed}

@router.get("/list/{user_id}")
def list_goals(user_id: int, db: Session = Depends(get_db)):
    user_goals = db.query(goals.UserGoal).filter_by(user_id=user_id).all()
    return [
        {"id": g.id, "goal": g.goal, "completed": g.completed, "created_at": g.created_at, "updated_at": g.updated_at} for g in user_goals
    ]

@router.post("/complete/")
def complete_goal(user_id: int, goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(goals.UserGoal).filter_by(user_id=user_id, id=goal_id).first()
    if goal:
        goal.completed = True
        db.commit()
        return {"success": True}
    return {"success": False, "error": "Goal not found"}
