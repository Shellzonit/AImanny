from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from ..database import Base

# Association table for mentor-mentee relationships
mentor_mentee = Table(
    'mentor_mentee', Base.metadata,
    Column('mentor_id', Integer, ForeignKey('mentors.id')),
    Column('mentee_id', Integer, ForeignKey('users.id'))
)

class Mentor(Base):
    __tablename__ = 'mentors'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    bio = Column(String)
    expertise = Column(String)  # comma-separated skills/fields
    available = Column(Boolean, default=True)
    goals = Column(String)  # comma-separated goals/interests
    mentees = relationship('User', secondary=mentor_mentee, back_populates='mentors')

# Add mentors relationship to User model (in models/user.py):
# mentors = relationship('Mentor', secondary=mentor_mentee, back_populates='mentees')
