from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class SkillGapAnalysis(Base):
    __tablename__ = 'skill_gap_analyses'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    target_role = Column(String, index=True)
    missing_skills = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class MicroLesson(Base):
    __tablename__ = 'micro_lessons'
    id = Column(Integer, primary_key=True, index=True)
    skill = Column(String, index=True)
    content = Column(Text)
    quiz = Column(Text)  # JSON string for quiz questions/answers
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
