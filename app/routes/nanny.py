from fastapi import APIRouter

router = APIRouter()

@router.get("/greet")
def greet_user():
    return {
        "nanny": "Hello dear. I'm right here with you.",
        "tone": "gentle, elder, supportive"
    }
