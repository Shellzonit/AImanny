from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class MicroLesson(Base):
    __tablename__ = 'micro_lessons'
    id = Column(Integer, primary_key=True, index=True)
    skill = Column(String, index=True)
    content = Column(Text)
    quiz = Column(Text)  # JSON string for quiz questions/answers
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class UserLessonProgress(Base):
    __tablename__ = 'user_lesson_progress'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    lesson_id = Column(Integer, ForeignKey('micro_lessons.id'))
    completed = Column(Boolean, default=False)
    score = Column(Integer, default=0)
    last_accessed = Column(DateTime, default=datetime.datetime.utcnow)
