from fastapi import APIRouter

router = APIRouter()

@router.get("/career")
def get_career():
    return {"message": "Career endpoint"}
