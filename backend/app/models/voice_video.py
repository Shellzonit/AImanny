from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class VoiceMessage(Base):
    __tablename__ = 'voice_messages'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    file_url = Column(String)
    transcript = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class VideoSession(Base):
    __tablename__ = 'video_sessions'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    topic = Column(String)
    status = Column(String, default='pending')
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
