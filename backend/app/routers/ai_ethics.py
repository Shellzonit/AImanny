
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import ai_ethics, ethics_response

router = APIRouter(prefix="/ai-ethics", tags=["AI Ethics"])

@router.get("/scenarios/")
def list_scenarios(db: Session = Depends(get_db)):
    return db.query(ai_ethics.EthicsScenario).all()

@router.get("/resources/")
def list_resources(db: Session = Depends(get_db)):
    return db.query(ai_ethics.EthicsResource).all()

@router.get("/scenario/{scenario_id}")
def get_scenario(scenario_id: int, db: Session = Depends(get_db)):
    scenario = db.query(ai_ethics.EthicsScenario).filter_by(id=scenario_id).first()
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
    return scenario

@router.post("/scenario/{scenario_id}/respond/")
def respond_scenario(scenario_id: int, user_id: int, choice: str, reflection: str = '', db: Session = Depends(get_db)):
    response = ethics_response.EthicsScenarioResponse(
        user_id=user_id, scenario_id=scenario_id, choice=choice, reflection=reflection
    )
    db.add(response)
    db.commit()
    db.refresh(response)
    return {"success": True, "response_id": response.id}

@router.get("/responses/{user_id}")
def get_user_responses(user_id: int, db: Session = Depends(get_db)):
    responses = db.query(ethics_response.EthicsScenarioResponse).filter_by(user_id=user_id).all()
    return responses
