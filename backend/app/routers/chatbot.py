from fastapi import APIRouter, HTTPException, Request, Depends
from app.services.llm_service import chat_with_llm
from app.services.emotion import detect_emotion
from app.models import goals as goals_model
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

# In-memory context store (for demo; use DB/Redis for production)
user_contexts = {}

@router.post("/message/")
def chatbot_message(request: Request, user_id: int, message: str, db: Session = Depends(get_db)):
    # Retrieve or initialize user context
    context = user_contexts.get(user_id, [])
    context.append({"role": "user", "content": message})
    # Limit context length for efficiency
    context = context[-10:]

    # Detect emotion
    emotion = detect_emotion(message)
    supportive_prefix = None
    if emotion == 'negative' or any(kw in message.lower() for kw in ["didn't get the job", "rejected", "failed", "no offer", "not hired"]):
        supportive_prefix = (
            "I'm really sorry to hear that. Remember, setbacks are part of the journey. "
            "Let's set a new goal together! What would you like to focus on next? "
            "Here are some ideas: update your resume, learn a new skill, or apply to a different company. "
            "I'm here to help you every step of the way."
        )
        # Optionally, suggest an existing goal or prompt to add a new one
        user_goals = db.query(goals_model.UserGoal).filter_by(user_id=user_id, completed=False).all()
        if user_goals:
            supportive_prefix += "\nYour current goals: " + ", ".join([g.goal for g in user_goals])

    try:
        reply = chat_with_llm(context)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    if supportive_prefix:
        reply = supportive_prefix + "\n" + reply
    context.append({"role": "assistant", "content": reply})
    user_contexts[user_id] = context
    return {"reply": reply, "context": context}
