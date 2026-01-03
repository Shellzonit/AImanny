from sqlalchemy import Column, Integer, String, DateTime, Text
from app.database import Base
from datetime import datetime

class CareerResource(Base):
	__tablename__ = "career_resources"
	id = Column(Integer, primary_key=True, index=True)
	title = Column(String, nullable=False)
	content = Column(Text, nullable=False)
	created_at = Column(DateTime, default=datetime.utcnow)

class CareerTip(Base):
	__tablename__ = "career_tips"
	id = Column(Integer, primary_key=True, index=True)
	tip = Column(Text, nullable=False)
	created_at = Column(DateTime, default=datetime.utcnow)

class MockInterview(Base):
	__tablename__ = "mock_interviews"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, nullable=False)
	scheduled_date = Column(DateTime, nullable=False)
	score = Column(Integer, nullable=True)
	feedback = Column(Text, nullable=True)
	created_at = Column(DateTime, default=datetime.utcnow)
	interview_date = Column(DateTime, nullable=True)