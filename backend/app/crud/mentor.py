from sqlalchemy.orm import Session
from ..models.mentor import Mentor
from ..models.user import User

def get_mentor_by_user_id(db: Session, user_id: int):
    return db.query(Mentor).filter(Mentor.user_id == user_id).first()

def create_mentor(db: Session, user_id: int, bio: str = None, expertise: str = None, available: bool = True, goals: str = None):
    mentor = Mentor(user_id=user_id, bio=bio, expertise=expertise, available=available, goals=goals)
    db.add(mentor)
    db.commit()
    db.refresh(mentor)
    return mentor

def update_mentor(db: Session, mentor: Mentor, bio: str = None, expertise: str = None, available: bool = None, goals: str = None):
    if bio is not None:
        mentor.bio = bio
    if expertise is not None:
        mentor.expertise = expertise
    if available is not None:
        mentor.available = available
    if goals is not None:
        mentor.goals = goals
    db.commit()
    db.refresh(mentor)
    return mentor

def delete_mentor(db: Session, mentor: Mentor):
    db.delete(mentor)
    db.commit()

def get_all_mentors(db: Session):
    return db.query(Mentor).all()

def assign_mentor_to_user(db: Session, mentor: Mentor, mentee: User):
    mentor.mentees.append(mentee)
    db.commit()
    db.refresh(mentor)
    return mentor

def get_mentees_for_mentor(db: Session, mentor: Mentor):
    return mentor.mentees
