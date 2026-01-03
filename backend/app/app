from fastapi import FastAPI

app = FastAPI(
    title="Mr. Nanny API",
    description="Career + Wellness elder companion backend",
    version="1.0.0"
)

from app.routes.home import router as home_router
from app.routes.nanny import router as nanny_router
from app.routes.career import router as career_router
from app.routes.wellness import router as wellness_router

app.include_router(home_router)
app.include_router(nanny_router, prefix="/nanny")
app.include_router(career_router, prefix="/career")
app.include_router(wellness_router, prefix="/wellness")

@app.get("/")
def read_root():
    return {"message": "Welcome to MrNannyApp API!"}
