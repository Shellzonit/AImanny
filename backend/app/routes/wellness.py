from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_wellness():
    return {"message": "Wellness endpoint"}
