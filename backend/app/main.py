
from fastapi import FastAPI
from app.routes.home import router as home_router
from app.routes.age_verification import router as age_verification_router
from app.routes.outdoor import router as outdoor_router
from app.routes.admin import router as admin_router
from app.routes.nanny import router as nanny_router
from app.routes.career import router as career_router
from app.routes.wellness import router as wellness_router
from app.routes.user import router as user_router
from app.routes.jobs import router as jobs_router
from app.routes.messages import router as messages_router
from app.routers import skill_gap, ai_ethics, voice_video
from app.routers import microlearning, chatbot, goals, vr_career, vr_wellness


app = FastAPI(
    title="Mr. Nanny API",
    description="Career + Wellness elder companion backend",
    version="1.0.0"
)



app.include_router(home_router)
app.include_router(nanny_router, prefix="/nanny")
app.include_router(career_router, prefix="/career")
app.include_router(wellness_router, prefix="/wellness")
app.include_router(user_router, prefix="/user")
app.include_router(jobs_router, prefix="/jobs")
app.include_router(messages_router, prefix="/messages")
app.include_router(skill_gap.router)
app.include_router(age_verification_router, prefix="/age-verification")
app.include_router(outdoor_router, prefix="/outdoor")
app.include_router(admin_router, prefix="/admin")
app.include_router(ai_ethics.router)
app.include_router(voice_video.router)

app.include_router(microlearning.router)
app.include_router(chatbot.router)
app.include_router(goals.router)
app.include_router(vr_career.router)
app.include_router(vr_wellness.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to MrNannyApp API!"}
