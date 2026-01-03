from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import vr_career

router = APIRouter(prefix="/vr-career", tags=["VR Career"])

@router.get("/scenarios/")
def list_vr_scenarios(db: Session = Depends(get_db)):
    scenarios = db.query(vr_career.VRCareerScenario).all()
    return [
        {
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "asset_url": s.asset_url,
            "industry": s.industry,
            "created_at": s.created_at
        } for s in scenarios
    ]

@router.post("/scenarios/")
def create_vr_scenario(title: str, description: str, asset_url: str, industry: str, db: Session = Depends(get_db)):
    scenario = vr_career.VRCareerScenario(
        title=title,
        description=description,
        asset_url=asset_url,
        industry=industry
    )
    db.add(scenario)
    db.commit()
    db.refresh(scenario)
    return {"id": scenario.id}
