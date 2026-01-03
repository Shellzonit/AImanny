from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal

from app.models.message_models import Message as MessageModel
from app.auth import get_current_user

router = APIRouter()

class MessageCreate(BaseModel):
    sender: str
    recipient: str
    content: str

class MessageOut(BaseModel):
    id: int
    sender: str
    recipient: str
    content: str
    timestamp: datetime

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[MessageOut])
def get_messages(db: Session = Depends(get_db)):
    return db.query(MessageModel).all()

@router.post("/", response_model=MessageOut)
def send_message(message: MessageCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_message = MessageModel(
        sender=message.sender,
        recipient=message.recipient,
        content=message.content,
        timestamp=datetime.utcnow()
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
