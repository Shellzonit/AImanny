from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import vr_wellness

router = APIRouter(prefix="/vr-wellness", tags=["VR Wellness"])

@router.get("/experiences/")
def list_vr_experiences(db: Session = Depends(get_db)):
    experiences = db.query(vr_wellness.VRWellnessExperience).all()
    return [
        {
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "asset_url": e.asset_url,
            "category": e.category,
            "created_at": e.created_at
        } for e in experiences
    ]

@router.post("/experiences/")
def create_vr_experience(title: str, description: str, asset_url: str, category: str, db: Session = Depends(get_db)):
    experience = vr_wellness.VRWellnessExperience(
        title=title,
        description=description,
        asset_url=asset_url,
        category=category
    )
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return {"id": experience.id}
