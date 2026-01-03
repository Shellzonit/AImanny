from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class VRWellnessExperience(Base):
    __tablename__ = 'vr_wellness_experiences'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    asset_url = Column(String)  # Link to VR asset or experience
    category = Column(String)   # e.g., meditation, relaxation, nature
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
