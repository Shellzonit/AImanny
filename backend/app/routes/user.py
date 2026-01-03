
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user_models import User
from app.auth import get_password_hash, verify_password, create_access_token
import hashlib

router = APIRouter()


class UserRegistration(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str = None
    email: EmailStr = None
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




@router.post("/register")
def register_user(user: UserRegistration, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.email == user.email) | (User.username == user.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered.")
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully!", "user": db_user.username}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    if not user.username and not user.email:
        raise HTTPException(status_code=400, detail="Username or email required.")
    db_user = None
    if user.email:
        db_user = db.query(User).filter(User.email == user.email).first()
    elif user.username:
        db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
