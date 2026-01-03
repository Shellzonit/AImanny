from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class VRCareerScenario(Base):
    __tablename__ = 'vr_career_scenarios'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    asset_url = Column(String)  # Link to VR asset or experience
    industry = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
