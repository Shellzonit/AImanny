
import os
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import voice_video
from ..database import Base, engine
from sqlalchemy.orm import Session
import shutil

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/voice-video", tags=["Voice & Video"])


@router.post("/voice/upload/")
def upload_voice(user_id: int = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Save file to disk
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Create DB entry
    voice_msg = voice_video.VoiceMessage(
        user_id=user_id,
        file_url=f"/voice-video/voice/file/{file.filename}",
        transcript=""  # Placeholder for transcript, can be updated with speech-to-text
    )
    db.add(voice_msg)
    db.commit()
    db.refresh(voice_msg)
    return {"message": "Voice uploaded", "file_url": voice_msg.file_url, "id": voice_msg.id}


@router.get("/voice/{user_id}")
def get_voice_messages(user_id: int, db: Session = Depends(get_db)):
    msgs = db.query(voice_video.VoiceMessage).filter(voice_video.VoiceMessage.user_id == user_id).all()
    return [
        {
            "id": m.id,
            "file_url": m.file_url,
            "transcript": m.transcript,
            "created_at": m.created_at
        } for m in msgs
    ]


@router.get("/voice/file/{filename}")
def get_voice_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="audio/wav")


from fastapi import Body

@router.post("/video/start/")
def start_video_session(user_id: int = Body(...), topic: str = Body(...), db: Session = Depends(get_db)):
    # Create a new video session in the DB
    session = voice_video.VideoSession(
        user_id=user_id,
        topic=topic,
        status="pending"
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"session_id": session.id, "status": session.status, "topic": session.topic, "created_at": session.created_at}


@router.get("/video/{user_id}")
def get_video_sessions(user_id: int, db: Session = Depends(get_db)):
    sessions = db.query(voice_video.VideoSession).filter(voice_video.VideoSession.user_id == user_id).all()
    return [
        {
            "id": s.id,
            "topic": s.topic,
            "status": s.status,
            "created_at": s.created_at
        } for s in sessions
    ]
