from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class EthicsScenario(Base):
    __tablename__ = 'ethics_scenarios'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    choices = Column(Text)  # JSON string for scenario choices
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class EthicsResource(Base):
    __tablename__ = 'ethics_resources'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
