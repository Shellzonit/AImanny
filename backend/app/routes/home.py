from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Mr. Nanny backend is alive and listening."}
