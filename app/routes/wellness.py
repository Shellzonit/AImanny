from fastapi import APIRouter

router = APIRouter()

@router.get("/wellness")
def get_wellness():
    return {"message": "Wellness endpoint"}
