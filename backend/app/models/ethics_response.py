from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class EthicsScenarioResponse(Base):
    __tablename__ = 'ethics_scenario_responses'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    scenario_id = Column(Integer, ForeignKey('ethics_scenarios.id'))
    choice = Column(Text)
    reflection = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
